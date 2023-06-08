import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StorageService {
  private APP_SIDE = 'APP_SIDE';
  private _appSide = new BehaviorSubject<number>(0);

  appSide$ = this._appSide.asObservable();

  constructor() { this.startAppSide(); }

  private startAppSide() {
    const side = this.getAppSide();
    this.setAppSide(side);
  }

  setAppSide(side: number = 0): void {
    localStorage.setItem(this.APP_SIDE, side.toString());
    this._appSide.next(side);
  }

  getAppSide() {
    const localSide = localStorage.getItem(this.APP_SIDE);
    return localSide === null ? 0 : parseInt(localSide);
  }

  hasAppSide() {
    return this.getAppSide() !== 0;
  }

  isAppSideBit() {
    return this.getAppSide() === 1;
  }
}