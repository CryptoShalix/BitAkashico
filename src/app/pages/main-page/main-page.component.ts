import { Component, OnInit } from '@angular/core';

import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';

import { URLS } from '../../shared/models/core';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  APP_SIDE: number;
  IS_BIT_SITE: boolean = false;
  iconListMedia: LinkableIcon[];
  iconListTopApps: LinkableIcon[];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.APP_SIDE = this.storageService.getAppSide();
    this.IS_BIT_SITE = this.APP_SIDE === 1;
    this.prepareIconListMedia();
    this.prepareIconListTopApps();
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }

  private prepareIconListTopApps(): void {
    this.iconListTopApps = [];
    this.iconListTopApps.push(new LinkableIcon('TopApp1', {
      href: URLS.REF_Wirex,
      title: 'Wirex',
      tooltip: 'PAGES.TOOLS.GROUPS.EXCHANGES_CEX.appWirex',
      iconPath: 'get_app',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.BLANK,
      showText: true,
      isCard: true
    }));
    this.iconListTopApps.push(new LinkableIcon('TopApp2', {
      href: URLS.REF_Slice,
      title: 'Slice',
      tooltip: 'PAGES.TOOLS.GROUPS.OTHERS.appSlice',
      iconPath: 'get_app',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.BLANK,
      showText: true,
      isCard: true
    }));
  }

  getAppSentence() {
    let msg = 'MSG.';
    if (this.APP_SIDE === 1) {
      msg += 'appSentenceBit' + (Math.random() + 1).toFixed(0);
    } else if (this.APP_SIDE === 2) {
      msg += 'appSentenceAka';
    }
    return msg;
  }
}
