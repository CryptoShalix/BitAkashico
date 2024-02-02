import { Component, OnInit } from '@angular/core';

import { StorageService } from 'src/app/shared/services/storage.service';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-academy-page',
  templateUrl: './academy-page.component.html',
  styleUrls: ['./academy-page.component.scss']
})
export class AcademyPageComponent implements OnInit {
  private _translateRoot = 'PAGES.ACADEMY.';
  IS_BIT_SIDE = false;
  TITLE_TEXT = '';

  constructor(
    private coreService: CoreService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(() => {
      this.IS_BIT_SIDE = this.coreService.isAppSidebit();
      this.TITLE_TEXT = this._translateRoot + (this.IS_BIT_SIDE ? 'titleBit' : 'titleAka');
    });
  }

  getAboutTextBySide() {
    return this._translateRoot + (this.IS_BIT_SIDE ? 'BIT.about' : 'AKASHICO.about');
  }
}
