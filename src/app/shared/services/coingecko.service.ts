import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';

import { Coin, ECurrency } from '../models/currency';

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
  ) { }

  getCoins(
    currency: ECurrency = ECurrency.USD,
    itemsPerPage: number = 100,
    currentPage: number = 1,
    sparkline: boolean = false
  ): Promise<Coin[]> {
    // Prepare params
    const pCurrency = `?vs_currency=${currency}`;
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
          map((data: any) => data.map((item: any) => new Coin(item)))
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
}
