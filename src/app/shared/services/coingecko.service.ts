import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { EDateFormat, IValueText } from '../models/core';

import { Coin, CoinDefault, ECurrency } from '../models/currency';
import { CoreService } from './core.service';

/**
 * Coingecko documentation: https://www.coingecko.com/en/api/documentation
 */

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private cApiMainUrl = `https://api.coingecko.com/api/v3`;

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) { }

  getCoins(
    currency: IValueText = ECurrency.USD,
    itemsPerPage: number = 10,
    currentPage: number = 1,
    sparkline: boolean = false
  ): Promise<Coin[]> {
    // Prepare params
    const pCurrency = `?vs_currency=${currency.value}`;
    const pOrder = `&order=market_cap_desc`;
    const pItemsPerPage = `&per_page=${itemsPerPage}`;
    const pPage = `&page=${currentPage}`;
    const pSparkline = `&sparkline=${sparkline}`;

    // Set params filter
    const urlFilter = `${pCurrency}${pOrder}${pItemsPerPage}${pPage}${pSparkline}`;

    // Set url
    const path = `${this.cApiMainUrl}/coins/markets${urlFilter}`;

    // Do the call
    return new Promise<Coin[]>((resolve, reject) => {
      this.http.get<string>(path)
        .pipe(first(),
          map((data: any) => data.map((item: any) => new Coin(currency, item)))
        )
        .subscribe({
          next: (response: Coin[]) => {
            resolve(response);
          },
          error: (error) => {
            // this.errorService.manageError(error);
            reject(error);
          },
        });
    });
  }

  getCoinByDate(
    coin: string,
    date: string,
    currency: IValueText = ECurrency.USD,
  ): Promise<CoinDefault[]> {
    // Prepare params
    const pDate = `?date=${this.coreService.formatDate(date)}`;

    // Set params filter
    const urlFilter = `${pDate}`;

    // Set url
    const path = `${this.cApiMainUrl}/coins/${coin.toLowerCase()}/history${urlFilter}`;

    // Do the call
    return new Promise<CoinDefault[]>((resolve, reject) => {
      this.http.get<string>(path)
        .pipe(first(),
          map((data: any) => data.map((item: any) => new CoinDefault(currency, item)))
        )
        .subscribe({
          next: (response: CoinDefault[]) => {
            resolve(response);
          },
          error: (error) => {
            // this.errorService.manageError(error);
            reject(error);
          },
        });
    });
  }

}
