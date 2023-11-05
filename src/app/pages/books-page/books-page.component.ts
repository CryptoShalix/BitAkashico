import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../shared/services/core.service';
import { DBService } from 'src/app/shared/services/db.service';

import { IGalleryItem } from 'src/app/shared/components/gallery/gallery.model';
import { StorageService } from 'src/app/shared/services/storage.service';
@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  private _translateRoot = 'PAGES.BOOKS.';
  private IS_BIT_SIDE = false;
  TITLE_TEXT = 'MENU.books';

  _galleryBooks: IGalleryItem[] = [];

  constructor(
    private coreService: CoreService,
    private storageService: StorageService,
    private dbService: DBService
  ) { }

  async ngOnInit(): Promise<void> {
    this.storageService.appSide$.subscribe(() => {
      this.IS_BIT_SIDE = this.coreService.isAppSidebit();
      this.TITLE_TEXT = this._translateRoot + (this.IS_BIT_SIDE ? 'titleBit' : 'titleAka');
      this.getData();
    });
  }

  private async getData() {
    this._galleryBooks = await this.dbService.getBooks(this.IS_BIT_SIDE);
  }

  getAboutTextBySide() {
    return this._translateRoot + (this.IS_BIT_SIDE ? 'aboutBit' : 'aboutAka');
  }
}
