import { Component, OnInit } from '@angular/core';
import { BOOKS, IBOOK } from 'src/app/shared/models/core';
import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  books: IBOOK[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.books = this.coreService.sorter(BOOKS.get(), 'name');
  }
}
