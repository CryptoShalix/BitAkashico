import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { EDateFormat, IValueText } from '../models/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // Properties
  private appTitle = 'Crypto Shalix';

  // Variables (private)
  private defaultCurrency: IValueText;
  private userLanguage: string;

  constructor() { }

  // APP RELATED

  getAppTitle(): string { return this.appTitle; }

  // LANGUAGE

  setUserLanguage(userLang: string): void {
    this.userLanguage = userLang;
  }

  // TEXT AND ITEMS

  isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
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
}
