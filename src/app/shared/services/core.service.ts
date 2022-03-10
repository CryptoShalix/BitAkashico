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
  private userLocale: string;
  private userLanguage: string;

  constructor() { }

  // APP RELATED

  getAppTitle(): string { return this.appTitle; }

  // TEXT AND ITEMS

  isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  setUserLocale(userLocale: string): void {
    this.userLocale = userLocale;
    this.setUserLanguage(this.userLocale.split('-')[0]);
    console.log(`User language: ${this.getUserLanguage()}`);
  }

  getUserLocale(): string {
    return this.userLocale;
  }

  setUserLanguage(userLanguage: string): void {
    this.userLanguage = userLanguage;
  }

  getUserLanguage(): string {
    return this.userLanguage;
  }

  // DATES

  formatDate(date: string, format: EDateFormat = EDateFormat.shortDash): string {
    return formatDate(date, format, this.getUserLocale());
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
