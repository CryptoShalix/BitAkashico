import { Component, OnInit } from '@angular/core';

import { BOOKS, IBOOK } from 'src/app/shared/models/core';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  IS_BIT_SIDE = false;
  TITLE_LOGO = '';
  TITLE_TEXT = '';
  books: IBOOK[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this.TITLE_LOGO = this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO;
    this.TITLE_TEXT = this.IS_BIT_SIDE ? 'BIT' : 'AKASHICO';
    this.books = this.coreService.sorter(this.IS_BIT_SIDE ? BOOKS.getBit() : BOOKS.getAkashico(), 'name');
  }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }

  getAboutTextBySide() {
    return this.IS_BIT_SIDE ? 'PAGES.BOOKS.aboutBit' : 'PAGES.BOOKS.aboutAka';
  }
}
