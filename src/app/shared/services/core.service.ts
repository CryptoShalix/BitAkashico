import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  private appTitle = 'Crypto Shalix';

  constructor() { }

  getAppTitle(): string { return this.appTitle; }

  isNullOrEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
}
