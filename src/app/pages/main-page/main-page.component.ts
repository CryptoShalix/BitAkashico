import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/shared/services/db.service';
import { StorageService } from '../../shared/services/storage.service';

import { LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';
import { ISpanOrTitle } from 'src/app/shared/models/core';
import { CoreService } from 'src/app/shared/services/core.service';
import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  private userLanguage: string;
  private APP_SIDE: number;
  private APP_TOP_LIST = ['Wirex', 'Brave Browser', 'TradingView'];

  IS_BIT_SITE: boolean = false;
  APP_SENTENCE: string = '';
  mainPageContent: ISpanOrTitle[];
  iconListTopApps: LinkableIcon[];

  constructor(
    private coreService: CoreService,
    private storageService: StorageService,
    private dbService: DBService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(appSide => {
      this.APP_SIDE = appSide;
      if (this.storageService.hasAppSide()) {
        this.userLanguage = this.coreService.getUserLanguage();
        this.IS_BIT_SITE = this.APP_SIDE === 1;
        this.APP_SENTENCE = this.getAppSentence();
        this.prepareMainPageContent();
        this.prepareIconListTopApps();
      }
    });
  }

  private prepareMainPageContent() {
    this.mainPageContent = [];
    this.addContent('aboutMeTitle');
    this.addContent('aboutMe');

    this.addContent('aboutProject.title');
    this.addContent('aboutProject.main');
    this.addContent(
      'aboutProject.catFin',
      this.userLanguage === 'es' ? IMAGES.CAT_FIN_ES : IMAGES.CAT_FIN_EN
    );
    this.addContent(
      'aboutProject.catTec',
      IMAGES.CAT_TEC
    );
    this.addContent(
      'aboutProject.catSpi',
      IMAGES.CAT_SPI
    );

    this.addContent('howMuchTitle');
    this.addContent('howMuch');

    this.addContent('howToStartTitle');
    this.addContent('howToStart');
  }

  private addContent(text: string, _pathImg: string = '') {
    const _pathRoot = 'PAGES.MAIN.';
    this.mainPageContent.push({
      text: _pathRoot + text,
      isTitle: text.toLowerCase().includes('title'),
      image: _pathImg
    });
  }

  private prepareIconListTopApps(): void {
    this.iconListTopApps = [];
    if (this.IS_BIT_SITE) {
      this.APP_TOP_LIST.forEach(async (topApp: string) => {
        const _app = await this.dbService.getAppAsLinkableIcon(topApp);
        if (_app !== null) { this.iconListTopApps.push(_app); }
      });
    }
  }

  /**
   * @returns Get a random number between 1 and 2
   */
  private random = (_num: number = 1) => (Math.random() + _num).toFixed(0);

  getAppSentence() {
    let msg = 'SENTENCES.';
    const _random = this.random(2);
    if (parseInt(_random) > 2) {
      msg += 'appSentenceCom' + this.random();
    } else {
      if (this.APP_SIDE === 1) {
        msg += 'appSentenceBit' + this.random();
      } else if (this.APP_SIDE === 2) {
        msg += 'appSentenceAka' + this.random();
      }
    }
    return msg;
  }
}
