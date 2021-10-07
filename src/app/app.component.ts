import { Component, OnInit } from '@angular/core';
import { LinkableIcon, ELinkableIcon } from './shared/components/linkable-icon/linkable-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crypto Lovers';
  slogan = '';
  menuIcons: LinkableIcon[] = [];
  defaultIcons: LinkableIcon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.prepareMenu();
    this.prepareLinkableIcons();
  }

  private prepareMenu(): void {
    this.menuIcons = [];
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Home));
    this.menuIcons.push(new LinkableIcon(this.title,
      {
        title: this.title,
        href: '/',
        path: '../assets/images/Logo. Crypto Lovers v2 transparent.png',
        target: '_self',
        showText: true
      }
    ));
  }

  private prepareLinkableIcons(): void {
    this.defaultIcons = [];
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Discord));
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Telegram,
      {
        title: ELinkableIcon.Telegram,
        href: 'https://t.me/CryptoLoversES',
      }
    ));
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Telegram,
      {
        title: ELinkableIcon.Telegram + ' Feed',
        href: 'https://t.me/CryptoLoversESFeed',
      }
    ));
    this.defaultIcons.push(new LinkableIcon(ELinkableIcon.Twitter,
      {
        title: 'Test',
        href: 'https://www.google.es',
        showText: true,
        isCard: true,
      }
    ));
  }

  getCurrentBreadcrumb(): string {
    return this.title;
  }
}
