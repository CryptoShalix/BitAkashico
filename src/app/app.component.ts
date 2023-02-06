import { Component, HostListener, OnInit } from '@angular/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';

import { ECurrency } from './shared/models/currency';
import { INavMenu } from './shared/models/menu';

import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';
import { URLS } from './shared/models/core';

// Angular Material Icons: https://fonts.google.com/icons
// Angular translate: https://medium.com/angular-chile/aplicaciones-multilenguaje-en-angular-7-con-ngx-translate-db8d1e7b380c
// Lightning widget (donations): https://github.com/reneaaron/lightning-widget

/**
 * To publish this app on Github Pages
 * Source: https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4
 *
 * 1. Install: npm i angular-cli-ghpages - save-dev
 * 2. ng build --configuration production --base-href "https://adlrg.github.io/CryptoShalix/"
 * 3. ngh -d dist/CryptoShalix || npx angular-cli-ghpages - dir=dist/CryptoShalix
 *
 * Sum up: ng build --configuration production --base-href "https://adlrg.github.io/CryptoShalix/" && ngh -d dist/CryptoShalix
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
export class AppComponent implements OnInit {
  title = ELinkableIcon.Home;

  currency = ECurrency.USD;
  showContainerDonations = false;

  hasBeenCopied = false;

  private maxScreenWidth = 800;
  private isBelowResolution = false;

  // Copy text: https://www.geeksforgeeks.org/how-to-create-copy-to-clipboard-button/
  walletBTCLNZebedeeTag = URLS.ZEBEDEE_LNTAG;
  walletBTCLNZebedeeUrl = `${URLS.ZEBEDEE_LNURL}`;
  walletBTCPaynymTag = `${URLS.PAYNYM}`;
  walletBTCPaynymText = `Paynym: ${this.walletBTCPaynymTag}`;

  iconHome: LinkableIcon;
  iconContact: LinkableIcon;
  iconListMenu: LinkableIcon[] = [];

  icmIdHome = 'home';
  icmIdAcademy = 'academy';
  icmIdTools = 'tools';
  icmIdTrading = 'trading';
  icmIdPortfolio = 'portfolio';

  constructor(
    private coreService: CoreService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getCurrentScreenResolution();
    this.prepareLogo();
    this.prepareData();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.getCurrentScreenResolution();
  }

  private getCurrentScreenResolution(): void {
    this.isBelowResolution = window.innerWidth <= this.maxScreenWidth;
    this.prepareMenu();
  }

  private prepareMenu(): void {
    this.iconListMenu = [];
    this.iconListMenu.push(new LinkableIcon(this.icmIdHome, {
      title: 'MENU.home',
      iconPath: IMAGES.HOME_IMG,
      showText: false,
      type: ELinkableIconType.IMAGE,
    }));
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
    this.iconListMenu.push(new LinkableIcon(this.icmIdTrading, {
      routerLink: 'books',
      title: 'MENU.books',
      iconPath: 'menu_book',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdPortfolio, {
      routerLink: 'games',
      title: 'MENU.games',
      iconPath: 'sports_esports',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: !this.isBelowResolution,
      isMenu: true
    }));

    this.iconContact = new LinkableIcon(this.icmIdPortfolio, {
      routerLink: 'contact',
      title: 'MENU.contact',
      iconPath: 'alternate_email',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: false,
      isMenu: false,
    });
  }

  private prepareLogo(): void {
    this.iconHome = new LinkableIcon(ELinkableIcon.Home);
  }

  private prepareData(): void {
    this.coreService.setDefaultCurrency(ECurrency.USD);
  }

  getIconListMenu(id: string): LinkableIcon {
    const menu = this.iconListMenu.find((o) => o.id === id);
    return menu ? menu : new LinkableIcon(id);
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
