import { Component, OnInit } from '@angular/core';

import { IBOOK } from 'src/app/shared/models/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';
import { DBService } from 'src/app/shared/services/db.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  IS_BIT_SIDE = false;
  TITLE_LOGO = '';
  TITLE_TEXT = '';
  books = new Subject<IBOOK[]>();

  ICON_AMAZON = IMAGES.Amazon;

  constructor(
    private coreService: CoreService,
    private dbService: DBService
  ) { }

  async ngOnInit(): Promise<void> {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this.TITLE_LOGO = this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO;
    this.TITLE_TEXT = this.IS_BIT_SIDE ? 'BIT' : 'AKASHICO';

    this.books.next(await this.dbService.getBooks(this.IS_BIT_SIDE));
  }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }

  getAboutTextBySide() {
    return this.IS_BIT_SIDE ? 'PAGES.BOOKS.aboutBit' : 'PAGES.BOOKS.aboutAka';
  }
}
