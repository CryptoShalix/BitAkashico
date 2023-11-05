import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreService } from './shared/services/core.service';
import { TranslateService } from './shared/services/translate.service';
import { StorageService } from './shared/services/storage.service';

import { ECurrency } from './shared/models/currency';
import {
  ELinkableIcon,
  ELinkableIconType,
  ELinkableTarget,
  LinkableIcon
} from './shared/components/linkable-icon/linkable-icon';

import { IMAGES } from 'src/assets/images/images';

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
 * 3. npm run deploy (this one launches both generate and upload same time)
 * (this one launches a package.json script. Check it out to update any details)
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  APP_SIDE: number;
  IS_BIT_SITE = false;
  IMAGE_LOGO = IMAGES.HOME_IMG;
  title = ELinkableIcon.Home;

  currency = ECurrency.EUR;
  showContainerDonations = false;
  showMenu = false;
  showMenuAsLogo = true;

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
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(appSide => {
      this.APP_SIDE = appSide;
      this.prepareAppSide();
    });
  }

  private prepareAppSide() {
    if (this.storageService.hasAppSide()) {
      this.IS_BIT_SITE = this.APP_SIDE === 1;
      this.prepareMenu();
      this.prepareData();
    }
  }

  private prepareMenu(): void {
    this.iconListMenu = [];

    this.addMenuItem(ELinkableIcon.Home);
    this.addMenuItem(this.icmIdContact, 'alternate_email');
    this.addMenuItem(this.icmIdAcademy, 'school');
    this.addMenuItem(this.icmIdBooks, 'menu_book');

    if (this.IS_BIT_SITE) {
      this.addMenuItem(this.icmIdTools, 'construction');
      this.addMenuItem(this.icmIdGames, 'sports_esports');
      //this.addMenuItem(this.icmIdCalc,'assessment');
    }
  }

  private addMenuItem(linkId: string, linkIcon: string = '') {
    let _linkableIcon: LinkableIcon;
    if (linkIcon === '') {
      _linkableIcon = new LinkableIcon(ELinkableIcon.Home, {
        title: 'MENU.home',
        showText: true,
        isMenu: true
      });
    } else {
      _linkableIcon = new LinkableIcon(linkId, {
        href: linkId,
        title: 'MENU.' + linkId,
        iconPath: linkIcon,
        color: '#fff',
        type: ELinkableIconType.ICON,
        target: ELinkableTarget.SELF,
        showText: true,
        isMenu: true
      });
    }
    this.iconListMenu.push(_linkableIcon);
  }

  private prepareData(): void {
    this.coreService.setDefaultCurrency(ECurrency.USD);
  }

  onToggleSide() {
    const _appSide = this.storageService.isAppSideBit();
    this.storageService.setAppSide(_appSide ? 2 : 1);
    this.showMenu = false;
  }

  onChangeLanguage(): void {
    this.translateService.toggleUserLanguage();
    location.reload();
  }

  getTooltipLanguage(): string {
    return `LANGUAGE.${this.translateService.userLang}`;
  }

  getCurrentPage() {
    const path = this.router.url.replace('/', '').toLowerCase();
    return `MENU.${path === '' ? 'home' : path}`;
  }
}
