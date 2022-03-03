import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

import * as jsonEN from '../../../assets/languages/en.json';

export enum ELanguage {
  EN = 'en',
  ES = 'es',
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private pathJSONFiles = '../../../assets/languages/';
  // private jsonData: any;
  private jsonData: any = (jsonEN as any).default;
  private userLang: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.userLang = navigator.language || window.navigator.language;
    // this.getJSONFile(ELanguage.EN);
  }

  instant(value: string, options?: string[]): string {
    let result = '';
    result = value;
    const file: any[] = this.getData();
    console.log(value);
    console.log(file);
    console.log(file[0][value]);
    return result;
  }

  private getData() {
    // return await this.getJSONFile(ELanguage.EN);
    return this.jsonData;
  }

  private getJSONFile(language: ELanguage): void {
    const filePath = `${this.pathJSONFiles}${language.toLowerCase()}.json`;
    this.httpClient.get(filePath).subscribe((data) => {
      this.jsonData = data;
    });
  }

  private async getJSONFile2(language: ELanguage): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const filePath = `${this.pathJSONFiles}${language.toLowerCase()}.json`;
      this.httpClient.get(filePath)
        .pipe(first())
        .subscribe({
          next: (res: any) => { console.log('complete'); resolve(res); },
          error: (err: any) => { reject(err); },
        });
    });
  }
}
