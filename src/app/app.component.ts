import { Component, OnInit } from '@angular/core';
import { ELinkableIcon, ELinkableIconType, LinkableIcon } from './shared/components/linkable-icon/linkable-icon';

// Angular Material Icons: https://fonts.google.com/icons

/**
 * To publish this app on Github Pages
 *
 * 1. ng build --prod --base-href "https://adlrg.github.io/CryptoLovers/"
 * 2. ngh -d dist/CryptoLovers
 * OR
 * 1. npm run publish
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
  }
}
