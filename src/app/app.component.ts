import { Component, OnInit } from '@angular/core';
import { ELinkableIcon, ELinkableIconType, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';

// Ejecutar esto: npx @angular/cli@12 update @angular/material@12

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
  slogan = '';
  iconHome: LinkableIcon;
  iconListMenu: LinkableIcon[] = [];
  iconListMedia: LinkableIcon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.prepareLinkableIcons();
  }

  private prepareLinkableIcons(): void {
    this.prepareIconMenu();
    this.prepareIconListMenu();
    this.prepareIconListMedia();
  }

  private prepareIconMenu(): void {
    this.iconHome = new LinkableIcon(ELinkableIcon.Home);
  }

  private prepareIconListMenu(): void {
    this.iconListMenu = [];
    this.iconListMenu.push(new LinkableIcon(this.title,
      {
        href: '/',
        path: 'home',
        target: '_self',
        title: this.title,
        showText: true,
        isCard: true,
        type: ELinkableIconType.ICON,
      },
    ));
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }
}
