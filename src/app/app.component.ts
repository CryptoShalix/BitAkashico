import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';
import { CoingeckoService } from './shared/services/coingecko.service';

import { map, Subscription, timer } from 'rxjs';
import { Coin, ECoinFormat, ECurrency } from './shared/models/currency';

import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';
import { StorageService } from './shared/services/storage.service';
import { IMAGES } from 'src/assets/images/images';
import { Router } from '@angular/router';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  APP_SIDE: number;
  IS_BIT_SITE = false;
  LOGO_IMG = IMAGES.HOME_IMG;
  title = ELinkableIcon.Home;

  private timerSubscription: Subscription;
  private callTiming = 60;
  coinFormat = ECoinFormat.INFO;
  coinBitcoin: Coin;

  currency = ECurrency.EUR;
  showContainerDonations = false;
  showMenu = false;

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
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.prepareAppSide();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  private prepareAppSide() {
    this.storageService.appSide$.subscribe(appSide => {
      this.APP_SIDE = appSide;
      if (this.storageService.hasAppSide()) {
        this.IS_BIT_SITE = this.APP_SIDE === 1;
        this.prepareMenu();
        this.prepareData();
        this.getCoinData();
      }
    });
  }

  private prepareMenu(): void {
    this.iconListMenu = [];

    this.iconListMenu.push(new LinkableIcon(ELinkableIcon.Home, {
      title: 'MENU.home',
      showText: true,
      isMenu: true
    }));

    this.iconListMenu.push(new LinkableIcon(this.icmIdAcademy, {
      routerLink: 'academy',
      title: 'MENU.academy',
      iconPath: 'school',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
      isMenu: true
    }));

    if (this.IS_BIT_SITE) {
      this.iconListMenu.push(new LinkableIcon(this.icmIdTools, {
        routerLink: 'tools',
        title: 'MENU.tools',
        iconPath: 'construction',
        color: '#fff',
        type: ELinkableIconType.ICON,
        target: ELinkableTarget.SELF,
        showText: true,
        isMenu: true
      }));
    }

    this.iconListMenu.push(new LinkableIcon(this.icmIdBooks, {
      routerLink: 'books',
      title: 'MENU.books',
      iconPath: 'menu_book',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
      isMenu: true
    }));

    // if (this.IS_BIT_SITE) {
    //   this.iconListMenu.push(new LinkableIcon(this.icmIdCalc, {
    //     routerLink: 'finances',
    //     title: 'MENU.finances',
    //     iconPath: 'assessment',
    //     color: '#fff',
    //     type: ELinkableIconType.ICON,
    //     target: ELinkableTarget.SELF,
    //     showText: true,
    //     isMenu: true
    //   }));
    // }

    if (this.IS_BIT_SITE) {
      this.iconListMenu.push(new LinkableIcon(this.icmIdGames, {
        routerLink: 'games',
        title: 'MENU.games',
        iconPath: 'sports_esports',
        color: '#fff',
        type: ELinkableIconType.ICON,
        target: ELinkableTarget.SELF,
        showText: true,
        isMenu: true
      }));
    }

    this.iconListMenu.push(new LinkableIcon(this.icmIdContact, {
      routerLink: 'contact',
      title: 'MENU.contact',
      iconPath: 'alternate_email',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
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

  onToggleSide() {
    this.storageService.setAppSide();
    this.coreService.redirectTo();
  }

  onChangeLanguage(): void {
    this.translateService.toggleUserLanguage();
    location.reload();
  }

  getTooltipLanguage(): string {
    return `LANGUAGE.${this.translateService.userLang}`;
  }

  getAppSentence() {
    let msg = 'MSG.';
    if (this.APP_SIDE === 1) {
      msg += 'appSentenceBit' + (Math.random() + 1).toFixed(0);
    } else if (this.APP_SIDE === 2) {
      msg += 'appSentenceAka';
    }
    return msg;
  }

  getCurrentPage() {
    const path = this.router.url.replace('/', '').toLowerCase();
    return `MENU.${path === '' ? 'home' : path}`;
  }
}
