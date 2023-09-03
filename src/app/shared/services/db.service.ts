import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

import { BOOKS, IBOOK } from '../models/core';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private PATH_DB_BOOKS = 'assets/db/db_books.json';

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) { }

  async getBooks(isBitSide: boolean = false): Promise<IBOOK[]> {
    let list: IBOOK[] = [];
    try {
      list = await this.getData(this.PATH_DB_BOOKS);
      if (list && list.length) {
        list = list.filter(b => b.side === 'com' || b.side === (isBitSide ? 'bit' : 'aka'));
        list.forEach(b => BOOKS.mapModel(b));
        list = this.coreService.sorter(list, 'name');
      }
    } catch (error) {
      console.error(error);
    }
    return list;
  }

  private getData(url: string): any {
    return new Promise<any>((resolve, reject) => {
      this.http.get<string>(url)
        .pipe(first())
        .subscribe({
          next: (response: any) => {
            resolve(response);
          },
          error: (error) => {
            // this.errorService.manageError(error);
            reject(error);
          },
        });
    });
  }
}