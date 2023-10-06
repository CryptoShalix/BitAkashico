import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/shared/services/db.service';
import { StorageService } from '../../shared/services/storage.service';

import { ELinkableIcon, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private APP_SIDE: number;
  private APP_TOP_LIST = ['Wirex', 'Relai', 'Slice'];

  IS_BIT_SITE: boolean = false;
  APP_SENTENCE: string = '';
  iconListMedia: LinkableIcon[];
  iconListTopApps: LinkableIcon[];

  constructor(
    private storageService: StorageService,
    private dbService: DBService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(appSide => {
      this.APP_SIDE = appSide;
      if (this.storageService.hasAppSide()) {
        this.IS_BIT_SITE = this.APP_SIDE === 1;
        this.APP_SENTENCE = this.getAppSentence();
        // this.prepareIconListMedia();
        if (this.IS_BIT_SITE) {
          this.prepareIconListTopApps();
        }
      }
    });
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }

  private prepareIconListTopApps(): void {
    this.iconListTopApps = [];
    this.APP_TOP_LIST.forEach(async (topApp: string) => {
      const _app = await this.dbService.getAppAsLinkableIcon(topApp);
      if (_app !== null) { this.iconListTopApps.push(_app); }
    });
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
