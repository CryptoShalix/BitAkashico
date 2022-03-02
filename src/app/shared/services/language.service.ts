import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private userLang: string;

  constructor() {
    this.userLang = navigator.language || window.navigator.language;
  }
}
