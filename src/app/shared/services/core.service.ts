import { Injectable } from '@angular/core';

import { IValueText } from '../models/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // Properties
  private appTitle = 'Crypto Shalix';

  // Variables (private)
  private defaultCurrency: IValueText;

  constructor() { }

  // APP RELATED

  getAppTitle(): string { return this.appTitle; }

  // TEXT AND ITEMS

  isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
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
