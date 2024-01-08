import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';

import { CoreService } from './core.service';
import { ContactService } from './contact.service';

import { IGalleryItem } from '../components/gallery/gallery.model';
import { LinkableIcon, ELinkableIconType, ELinkableTarget } from '../components/linkable-icon/linkable-icon';
import { APP_GROUP, APP, IAPP_GROUP } from '../models/app';
import { IBOOK, BOOKS } from '../models/book';
import { ITestimonial } from '../models/testimonial';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private PATH_DB_APPS = 'assets/db/db_apps.json';
  private PATH_DB_TESTIMONIALS = 'assets/db/db_testimonials.json';
  private PATH_DB_BOOKS = 'assets/db/db_books.json';

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private contactService: ContactService,
  ) { }

  // METHODS: PUBLIC

  async getAppList(): Promise<APP_GROUP[]> {
    return await this._getApps();
  }

  async getBitcoinWallets(lnOnly: boolean = false): Promise<APP_GROUP[]> {
    const apps = await this.getAppList();
    const _appGroup: APP_GROUP[] = apps.filter(app =>
      app.groupName.toLowerCase().includes('bitcoin') &&
      app.groupName.toLowerCase().includes('wallet')
    );

    if (_appGroup.length > 0 && lnOnly) {
      _appGroup.forEach(appGroup => {
        appGroup.title += 'LN';
        appGroup.items = appGroup.items.filter(app => app.isLN);
      });
    }
    return _appGroup;
  }

  async getAppItem(appName: string): Promise<APP | null> {
    try {
      if (!this.coreService.isNullOrEmpty(appName)) {
        let result: APP | undefined = undefined;
        const _appsList = await this.getAppList();
        for (const app of _appsList) {
          result = app.items.find(appItem => appItem.name.toLowerCase() === appName.toLowerCase());
          if (!this.isNullOrEmpty(result)) { return result === undefined ? null : result; }
        }
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async getAppAsLinkableIcon(appName: string) {
    try {
      const appItem: APP | null = await this.getAppItem(appName);
      if (appItem !== null) {
        return new LinkableIcon(appName, {
          href: appItem.link,
          title: appItem.name,
          tooltip: appItem.description,
          iconPath: 'get_app',
          color: '#fff',
          type: ELinkableIconType.ICON,
          target: ELinkableTarget.BLANK,
          showText: true,
          isCard: true
        });
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }

  async getTestimonials(): Promise<ITestimonial[]> {
    return await this._getTestimonials();
  }

  async saveTestimonial(testimonial: ITestimonial): Promise<boolean> {
    try {
      this.contactService.sendTestimonial(testimonial);
      return true;
    } catch (error) {
      console.error(error);
    }
    return false;
  }

  async getBooks(IS_BIT_SIDE: boolean): Promise<IGalleryItem[]> {
    const list: IGalleryItem[] = [];
    const books = await this._getBooks(IS_BIT_SIDE);
    books.map(book => {
      list.push({
        imgPath: book.image,
        title: book.name,
        description: '',
        li_read: book.li_read,
        li_buy: book.li_buy,
      });
    });
    return list;
  }

  // METHODS: PRIVATE

  private async _getApps(): Promise<APP_GROUP[]> {
    const SORT_MAIN_BY = 'groupName';
    const SORT_CHILD_BY = '-rank';
    let result: APP_GROUP[] = [];
    try {
      let list: IAPP_GROUP[] = await this.getData(this.PATH_DB_APPS);
      if (list && list.length) {
        // Sort result list by '@SORT_MAIN_BY'
        list = this.coreService.sorter(list, SORT_MAIN_BY);
        // Fill result list with the model 'IAPP_GROUP' parsed as 'APP_GROUP'
        result = list.map((app: any) => new APP_GROUP(app));
        // Sort items from result list by '@SORT_CHILD_BY'
        result.map(appGroup => appGroup.items = this.coreService.sorter(appGroup.items, SORT_CHILD_BY));
      }
    } catch (error) {
      console.error(error);
    }
    return result;
  }

  private async _getTestimonials(): Promise<ITestimonial[]> {
    let list: ITestimonial[] = [];
    try {
      const currentLanguage = this.coreService.getUserLanguage();
      const appSide = this.coreService.isAppSidebit() ? 'bit' : 'aka';
      const dirtyList: ITestimonial[] = await this.getData(this.PATH_DB_TESTIMONIALS);
      dirtyList.map(t => {
        if (t.side === appSide && !this.isNullOrEmpty(t.testimonial[currentLanguage])) {
          t.name = t.anon || this.isNullOrEmpty(t.name) ? 'STRINGS.anonymous' : t.name;
          list.push(t);
        }
      });
    } catch (error) {
      console.error(error);
    }
    return list;
  }

  private async _getBooks(isBitSide: boolean = false): Promise<IBOOK[]> {
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

  private isNullOrEmpty(val: any) {
    return this.coreService.isNullOrEmpty(val);
  }
}