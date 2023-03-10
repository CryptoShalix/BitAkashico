import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

import { EDateFormat, IAccordion, IAccordionItem, IValueText, URLS } from '../models/core';

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

  prepareBitcoinWallets(lnOnly: boolean = false): IAccordion {
    const groupName = 'BITCOIN_WALLETS';

    const items: IAccordionItem[] = [];
    items.push(this.createToolItem(groupName, 'Blixt', URLS.REF_Blixt, 4.2, true));
    items.push(this.createToolItem(groupName, 'Blue Wallet', URLS.REF_BlueWallet, 4, true));
    items.push(this.createToolItem(groupName, 'Breez', URLS.REF_Breez, 4, true));
    items.push(this.createToolItem(groupName, 'Muun Wallet', URLS.REF_MuunWallet, 4.5, true));
    items.push(this.createToolItem(groupName, 'Phoenix', URLS.REF_Phoenix, 4.5, true));
    if (!lnOnly) { items.push(this.createToolItem(groupName, 'Samourai Wallet', URLS.REF_SamouraiWallet, 5)); }
    items.push(this.createToolItem(groupName, 'Simple Bitcoin Wallet (SBW)', URLS.REF_SimpleBitcoinWallet, 4.2, true));
    if (!lnOnly) { items.push(this.createToolItem(groupName, 'Sparrow Wallet', URLS.REF_SparrowWallet, 5)); }
    if (!lnOnly) { items.push(this.createToolItem(groupName, 'Specter Wallet', URLS.REF_SpecterWallet, 4.5)); }
    if (!lnOnly) { items.push(this.createToolItem(groupName, 'Defiant', URLS.REF_Defiant, 4)); }
    if (!lnOnly) { items.push(this.createToolItem(groupName, 'Liquality', URLS.REF_Liquality, 3.8)); }
    items.push(this.createToolItem(groupName, 'Wallet Of Satoshi', URLS.REF_WalletOfSatoshi, 3.8, true));
    items.push(this.createToolItem(groupName, 'Zap', URLS.REF_Zap, 4, true));
    items.push(this.createToolItem(groupName, 'Zebedee', URLS.REF_Zebedee, 3.8, true));
    items.push(this.createToolItem(groupName, 'Zeus', URLS.REF_Zeus, 4.1, true));

    const accordion = this.createToolsGroup(groupName, items, 'bitcoin', lnOnly);
    return accordion;
  }

  createToolsGroup(groupName: string, items: IAccordionItem[], icon?: string, lnOnly?: boolean, disabled?: boolean): IAccordion {
    items = (this.sorter(items, '-rank'));
    return {
      title: `PAGES.TOOLS.GROUPS.${groupName}.title${lnOnly ? 'LN' : ''}`,
      description: `PAGES.TOOLS.GROUPS.${groupName}.description`,
      disabled,
      icon,
      items
    };
  }

  createToolItem(groupName: string, name: string, link: string, rank: number, isLN: boolean = false): IAccordionItem {
    return {
      text: (isLN ? '[LN] ' : '') + name,
      link,
      description: `PAGES.TOOLS.GROUPS.${groupName}.app${name.replace(/\s/g, '')}`,
      image: '',
      rank
    };
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
}
