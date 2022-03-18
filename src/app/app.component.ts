import { Component, OnInit } from '@angular/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';

import { ECurrency } from './shared/models/currency';
import { INavMenu } from './shared/models/menu';

import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';

// Angular Material Icons: https://fonts.google.com/icons
// Angular translate: https://medium.com/angular-chile/aplicaciones-multilenguaje-en-angular-7-con-ngx-translate-db8d1e7b380c

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

  iconHome: LinkableIcon;
  iconListMedia: LinkableIcon[] = [];
  iconListMenu: LinkableIcon[] = [];
  navMenu: INavMenu[] = [];

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
    this.prepareMenu();
    this.prepareLogo();
    this.prepareIconListMedia();
    this.prepareData();
  }

  private prepareMenu(): void {
    this.navMenu = [];
    this.navMenu.push({ text: 'MENU.security', link: '/', icon: 'security', disabled: true });
    this.navMenu.push({ text: 'MENU.books', link: '/', icon: 'menu_book', disabled: true });
    this.navMenu.push({ text: 'MENU.games', link: '/', icon: 'sports_esports', disabled: true });

    this.iconListMenu = [];
    this.iconListMenu.push(new LinkableIcon(this.icmIdHome, {
      title: 'MENU.home',
      iconPath: IMAGES.HOME_SVG,
      showText: false,
      type: ELinkableIconType.SVG
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdAcademy, {
      // routerLink: 'academy',
      routerLink: '/',
      title: 'MENU.academy',
      iconPath: 'school',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdTools, {
      routerLink: 'tools',
      title: 'MENU.tools',
      iconPath: 'construction',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdTrading, {
      // routerLink: 'trading',
      routerLink: '/',
      title: 'MENU.trading',
      iconPath: 'groups',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon(this.icmIdPortfolio, {
      // routerLink: 'portfolio',
      routerLink: '/',
      title: 'MENU.portfolio',
      iconPath: 'pie_chart',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
  }

  private prepareLogo(): void {
    this.iconHome = new LinkableIcon(ELinkableIcon.Home);
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
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
}
