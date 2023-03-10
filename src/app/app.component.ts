import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';

import { map, Subscription, timer } from 'rxjs';
import { Coin, ECoinFormat, ECurrency } from './shared/models/currency';

import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';
import { URLS } from './shared/models/core';
import { CoingeckoService } from './shared/services/coingecko.service';

// Angular Material Icons: https://fonts.google.com/icons
// Angular translate: https://medium.com/angular-chile/aplicaciones-multilenguaje-en-angular-7-con-ngx-translate-db8d1e7b380c
// Lightning widget (donations): https://github.com/reneaaron/lightning-widget

/**
 * To publish this app on Github Pages
 * Source: https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4
 *
 * 1. Install: npm i angular-cli-ghpages - save-dev
 * 2. ng build --configuration production --base-href "https://cryptoshalix.github.io/BitAkashico/"
 * 3. ngh -d dist/CryptoShalix || npx angular-cli-ghpages - dir=dist/CryptoShalix
 *
 * Sum up: ng build --configuration production --base-href "https://cryptoshalix.github.io/BitAkashico/" && ngh -d dist/CryptoShalix
 *
 * OR
 * 1. npm run publish-generate
 * 2. npm run publish-upload
 * (this one launches a package.json script. Check it out to update any details)
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = ELinkableIcon.Home;

  private timerSubscription: Subscription;
  private callTiming = 60;
  coinFormat = ECoinFormat.INFO;
  coinBitcoin: Coin;

  currency = ECurrency.EUR;
  showContainerDonations = false;

  hasBeenCopied = false;

  private maxScreenWidth = 800;
  private isBelowResolution = false;

  // Copy text: https://www.geeksforgeeks.org/how-to-create-copy-to-clipboard-button/
  walletBTCLNZebedeeTag = URLS.ZEBEDEE_LNTAG;
  walletBTCLNZebedeeUrl = `${URLS.ZEBEDEE_LNURL}`;
  walletBTCPaynymTag = `${URLS.PAYNYM}`;
  walletBTCPaynymText = `Paynym: ${this.walletBTCPaynymTag}`;

  iconListMenu: LinkableIcon[] = [];

  icmIdAcademy = 'academy';
  icmIdTools = 'tools';
  icmIdCalc = 'calc';
  icmIdHome = 'home';
  icmIdBooks = 'books';
  icmIdGames = 'games';
  icmIdContact = 'contact';

  constructor(
    private coreService: CoreService,
    private translateService: TranslateService,
    private coingeckoService: CoingeckoService,
  ) { }

  ngOnInit(): void {
    this.getCurrentScreenResolution();
    this.prepareData();
    this.getCoinData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.getCurrentScreenResolution();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  private getCurrentScreenResolution(): void {
    this.isBelowResolution = window.innerWidth <= this.maxScreenWidth;
    this.prepareMenu();
  }

  private prepareMenu(): void {
    this.iconListMenu = [];

    this.iconListMenu.push(new LinkableIcon(this.icmIdAcademy, {
      routerLink: 'academy',
      title: 'MENU.academy',
      iconPath: 'school',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdTools, {
      routerLink: 'tools',
      title: 'MENU.tools',
      iconPath: 'construction',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdCalc, {
      routerLink: 'trading',
      title: 'MENU.trading',
      iconPath: 'assessment',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));

    this.iconListMenu.push(new LinkableIcon(ELinkableIcon.Home));

    this.iconListMenu.push(new LinkableIcon(this.icmIdBooks, {
      routerLink: 'books',
      title: 'MENU.books',
      iconPath: 'menu_book',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdGames, {
      routerLink: 'games',
      title: 'MENU.games',
      iconPath: 'sports_esports',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdContact, {
      routerLink: 'contact',
      title: 'MENU.contact',
      iconPath: 'alternate_email',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
  }

  private prepareData(): void {
    this.coreService.setDefaultCurrency(ECurrency.USD);
  }

  private async getCoinData(): Promise<void> {
    this.timerSubscription = timer(0, this.callTiming * 1000).pipe(map(async () => {
      const coins = await this.coingeckoService.getCoins(this.currency, 1, 1, false, false);
      this.coinBitcoin = coins[0];
    })).subscribe();
  }

  onChangeLanguage(): void {
    this.translateService.toggleUserLanguage();
    location.reload();
  }

  getTooltipLanguage(): string {
    return `LANGUAGE.${this.translateService.userLang}`;
  }

  onClickCopyToClipboard(): void {
    this.hasBeenCopied = true;
    const interval = setInterval(() => {
      this.hasBeenCopied = false;
      clearInterval(interval);
    }, 5000);
  }
}
