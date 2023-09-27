import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from './message.service';
import { StorageService } from './storage.service';

import { EDateFormat, IValueText } from '../models/core';

import { MessageType } from '../components/message-manager/message-manager.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // Properties
  private appTitle = 'Crypto Shalix';

  // Variables (private)
  private defaultCurrency: IValueText;
  private userLanguage: string;

  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private router: Router
  ) { }

  // APP RELATED

  getAppTitle(): string { return this.appTitle; }

  isAppSidebit() {
    return this.storageService.isAppSideBit();
  }

  // MESSAGE MANAGER

  showMessage(message: string) {
    this.messageService.sendMessage(message);
  }
  showSuccess(message: string) {
    this.messageService.sendMessage(message, MessageType.SUCCESS);
  }
  showAlert(message: string) {
    this.messageService.sendMessage(message, MessageType.ALERT);
  }
  showError(message: string) {
    this.messageService.sendMessage(message, MessageType.ERROR);
  }

  // LANGUAGE

  setUserLanguage(userLang: string): void {
    this.userLanguage = userLang;
  }

  // TEXT AND ITEMS

  isNullOrEmpty = (val: string | null | undefined) => val === undefined || val === null || val === '';
  isNullOrEmptyList = (list: string | any[]) => !list || list.length === 0;
  isString = (str: string | string[]) => typeof str === 'string' || str instanceof String;
  isBoolean = (boo: any) => typeof boo === 'boolean' || boo instanceof Boolean;
  isNumber = (num: any) => typeof num === 'number' || num instanceof Number || (this.isString(num) && !isNaN(num));

  sorter(fields: any[], paramToSort: string, reverse: boolean = false): any[] {
    return fields.sort((a, b) => {
      const dir = 1;
      if (paramToSort[0] === '-') {
        reverse = true;
        paramToSort = (paramToSort as string).substring(1);
      }
      const firstValue: string = this.getFieldSorterValue(a, paramToSort);
      const secondValue: string = this.getFieldSorterValue(b, paramToSort);

      const firstName = this.isString(firstValue) ? firstValue.toLowerCase() : firstValue;
      const secondName = this.isString(secondValue) ? secondValue.toLowerCase() : secondValue;

      if (reverse) {
        return firstName < secondName ? dir : firstName > secondName ? -(dir) : 0;
      }
      return firstName > secondName ? dir : firstName < secondName ? -(dir) : 0;
    });
  }

  private getFieldSorterValue(item: any, propertyNames: string | string[]): string {
    let propertyValue = propertyNames;
    if (this.isString(propertyNames)) {
      propertyValue = (propertyNames as string).split('.');
    }
    if (propertyValue.length === 1) { return item[(propertyValue as string[])[0]]; }
    let currentItem = item;
    let name = '';
    (propertyValue as string[]).map((propertyName, index) => {
      if (index < propertyValue.length - 1) {
        currentItem = currentItem[propertyName];
        return;
      }
      name = currentItem[propertyName];
    });
    return name;
  }

  // DATES

  formatDate(date: string, format: EDateFormat = EDateFormat.shortDash): string {
    return formatDate(date, format, this.userLanguage);
  }

  // CURRENCY

  setDefaultCurrency(newCurrency: IValueText): void {
    this.defaultCurrency = newCurrency;
  }

  getDefaultCurrency(): IValueText {
    return this.defaultCurrency;
  }

  // NAVIGATION

  navigateTo(url: string, openAs: string = '_blank'): void {
    if (!this.isNullOrEmpty(url)) {
      window.open(url, openAs);
    }
  }

  /**
   * Redirect using router. Not reloading full page, but main container (router-outlet).
   * 
   * @param url The internal url for this app. See app-routing-module.ts for examples. If 'url' is not received, this will redirect to '/'
   */
  redirectTo(url: string = '/') {
    // if (this.router.url === url) {
    //   this.router.navigated = false;
    //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // }
    this.router.navigateByUrl(url);
  }
}
