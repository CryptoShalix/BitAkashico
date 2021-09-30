import { Component, OnInit } from '@angular/core';
import { ESocialMediaIcon, SocialMediaIcon } from './shared/components/social-media-icon/social-media-icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Crypto Lovers';
  defaultIcons: SocialMediaIcon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.prepareSocialMediaIcons();
  }

  private prepareSocialMediaIcons(): void {
    this.defaultIcons = [];
    this.defaultIcons.push(new SocialMediaIcon(ESocialMediaIcon.Twitter));
    this.defaultIcons.push(new SocialMediaIcon(ESocialMediaIcon.Discord));
    this.defaultIcons.push(new SocialMediaIcon(this.title, this.title, '../assets/images/Logo. Crypto Lovers. Short.png', '/', false));
  }
}
