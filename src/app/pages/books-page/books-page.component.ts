import { Component, OnInit } from '@angular/core';

import { BOOKS, IBOOK } from 'src/app/shared/models/core';

import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  booksBit: IBOOK[] = [];
  booksAkashico: IBOOK[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.booksBit = this.coreService.sorter(BOOKS.getBit(), 'name');
    this.booksAkashico = this.coreService.sorter(BOOKS.getAkashico(), 'name');
  }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }
}
