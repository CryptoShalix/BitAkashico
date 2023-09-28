import { Component, OnInit } from '@angular/core';

import { ELinkableIcon, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  isAppSidebit = true;
  iconListMedia: LinkableIcon[];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.isAppSidebit = this.coreService.isAppSidebit();
    this.prepareIconListMedia();
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }

  getAboutText() {
    return this.isAppSidebit ? 'PAGES.CONTACT.aboutBit' : 'PAGES.CONTACT.aboutAka';
  }
}
