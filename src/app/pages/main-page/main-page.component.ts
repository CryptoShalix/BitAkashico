import { Component, OnInit } from '@angular/core';
import { ELinkableIcon, ELinkableIconType, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  iconListMedia: LinkableIcon[];

  constructor() { }

  ngOnInit(): void {
    this.prepareIconListMedia();
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }
}
