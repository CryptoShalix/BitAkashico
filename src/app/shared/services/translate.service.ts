import { Injectable } from '@angular/core';

import { CoreService } from './core.service';

import { ValueText } from '../models/core';

import * as jsonEN from '../../../assets/languages/en.json';
import * as jsonES from '../../../assets/languages/es.json';

export enum ELanguage {
  EN = 'en',
  ES = 'es',
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private cUserLanguage = 'userLanguage';
  userLang: string;

  constructor(
    private coreService: CoreService
  ) {
    this.getUserLanguage();
  }

  private getUserLanguage(): void {
    const userLanguage = localStorage.getItem(this.cUserLanguage);
    if (userLanguage) {
      this.userLang = userLanguage;
    } else {
      this.userLang = navigator.language || window.navigator.language;
      this.userLang = this.userLang.split('-')[0];
    }
    this.coreService.setUserLanguage(this.userLang);
    this.logger();
  }

  setUserLanguage(newLanguage: ELanguage): void {
    this.userLang = newLanguage;
    localStorage.setItem(this.cUserLanguage, this.userLang);
    this.coreService.setUserLanguage(this.userLang);
    this.logger();
  }

  toggleUserLanguage(): void {
    this.setUserLanguage(this.userLang === ELanguage.EN ? ELanguage.ES : ELanguage.EN);
  }

  /**
   * Get the text at the specified user language, so translated.
   * Example:
   * - .json file:
   * ```json
   * [{...
   *  "test": "A long text with {data}",
   *  "LEVEL1.test": "A long text with {data}"
   * ...}]
   * ```
   * - app.component.ts:
   * ```typescript
   * string result = ...instant('test', [{value: 'data', text: 'MyReplacedData'}]);
   * ```
   * - Result:
   * ```string
   * 'A long text with MyReplacedData'
   * ```
   * - [TIP] You can even set levels by adding a fullstop between those levels, like this:
   * ```typescript
   * string result = ...instant('LEVEL1.test', [{value: 'data', text: 'MyReplacedData'}]);
   * ```
   * @param value The first part that contains the text. Should be in english and easy to read.
   * @param options [Optional] A list of value-text pair in which the 'value' is the string to replace and the 'text' the new string.
   * @returns Returns a string totally parsed and with all value-text pairs integrated.
   */
  instant(value: string, options?: ValueText[]): string {
    let result = '';
    try {
      const file: any = this.getJSONFile();
      if (file) {
        if (value.includes('.')) {
          const valueLevels = value.split('.');
          let base = file[0];
          for (const level of valueLevels) {
            base = base[level];
          }
          result = base;
        } else {
          result = file[0][value];
        }

        if (options && options.length > 0) {
          for (const option of options) {
            result = result.replace(`{${option.value}}`, option.text);
          }
        }
      }
    } catch (error) { console.error(error); }
    return this.coreService.isNullOrEmpty(result) ? value : result;
  }

  private getJSONFile(): any {
    switch (this.userLang) {
      case ELanguage.ES: return (jsonES as any).default;
      case ELanguage.EN:
      default: return (jsonEN as any).default;
    }
  }

  private logger(): void {
    console.log(`User language: ${this.userLang}`);
  }
}
