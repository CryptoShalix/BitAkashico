import { Component, OnInit } from '@angular/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from './shared/services/core.service';

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
  showTopNavMenu = false;

  iconHome: LinkableIcon;
  iconListMedia: LinkableIcon[] = [];
  iconListMenu: LinkableIcon[] = [];
  navMenu: INavMenu[] = [];

  constructor(
    private coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.prepareMenu();
    this.prepareLinkableIcons();
    this.prepareData();
  }

  private prepareMenu(): void {
    this.navMenu = [];
    this.navMenu.push({ text: 'Seguridad', link: '/', icon: 'security', disabled: true });
    this.navMenu.push({ text: 'Libros', link: '/', icon: 'menu_book', disabled: true });
    this.navMenu.push({ text: 'Juegos', link: '/', icon: 'sports_esports', disabled: true });

    this.iconListMenu = [];
    this.iconListMenu.push(new LinkableIcon('home', {
      title: 'Home',
      iconPath: IMAGES.HOME_SVG,
      showText: false,
      type: ELinkableIconType.SVG
    }));
    this.iconListMenu.push(new LinkableIcon('academy', {
      routerLink: '/',
      title: 'Academia',
      iconPath: 'school',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon('utils', {
      routerLink: '/',
      title: 'Herramientas',
      iconPath: 'construction',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon('trading', {
      routerLink: 'trading',
      title: 'Trading',
      iconPath: 'groups',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
    this.iconListMenu.push(new LinkableIcon('portfolio', {
      routerLink: '/',
      title: 'Portfolio',
      iconPath: 'pie_chart',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF
    }));
  }

  private prepareLinkableIcons(): void {
    this.prepareLogo();
    this.prepareIconListMedia();
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
}
