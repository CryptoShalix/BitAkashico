import { Component, OnInit } from '@angular/core';

import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';
import { DBService } from 'src/app/shared/services/db.service';

import { IGalleryItem, IGalleryTitle, IGalleryTitleType } from 'src/app/shared/components/gallery/gallery.model';
@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  private IS_BIT_SIDE = false;

  _galleryTitle: IGalleryTitle;
  _galleryBooks: IGalleryItem[] = [];

  constructor(
    private coreService: CoreService,
    private dbService: DBService
  ) { }

  async ngOnInit(): Promise<void> {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this._galleryTitle = {
      titleLogo: this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO,
      titleText: this.IS_BIT_SIDE ? 'BIT' : 'AKASHICO',
      backgroundDark: this.IS_BIT_SIDE,
      type: this.IS_BIT_SIDE ? IGalleryTitleType.IMG : IGalleryTitleType.TXT
    };

    this._galleryBooks = await this.dbService.getBooks(this.IS_BIT_SIDE);
  }

  getAboutTextBySide() {
    return this.IS_BIT_SIDE ? 'PAGES.BOOKS.aboutBit' : 'PAGES.BOOKS.aboutAka';
  }
}
