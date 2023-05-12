import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { IValueText } from '../models/core';

import { Coin, ECurrency } from '../models/currency';
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

  getCoinsBase(currency: IValueText = ECurrency.USD): Promise<Coin[]> {
    // Set url
    const path = `${this.cApiMainUrl}/coins/list`;

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

  // /simple/price?ids=bitcoin%2Ccardano&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true&precision=full


  getSupportedCurrencies(): Promise<Coin[]> {
    // Set url
    const path = `${this.cApiMainUrl}/simple/supported_vs_currencies`;

    // Do the call
    return new Promise<Coin[]>((resolve, reject) => {
      this.http.get<string[]>(path)
        .pipe(first(),
          map((data: any) => data)
        )
        .subscribe({
          next: async (response: string[]) => {
            console.log(response);
            const listCoins = await this.getCoinsBase();

            // Add each supported currency to the ECurrency class
            // response.map(coin => ECurrency.addCoin(coin));
            // // Get full list of coins base data
            // const listCoinsBase = await this.getCoinsBase();
            // // Get these supported currencies base data
            const listResult: Coin[] = listCoins.filter(coin => response.some(symbol => symbol === coin.symbol));
            console.log(listResult);
            // ECurrency.getList().forEach(cur => {
            //   let item = listCoinsBase.find(cb => cb.symbol.toLowerCase() === cur.value);
            //   if (item != null) listResult.push(item);
            // });
            resolve(listResult);
          },
          error: (error) => {
            // this.errorService.manageError(error);
            reject(error);
          },
        });
    });
  }

  async getAllCoins(
    currency: IValueText = ECurrency.USD,
    sparkline: boolean = false,
    allowClick: boolean = true,
  ): Promise<Coin[]> {
    let keepSearching = true;
    let page = 1;
    let listResult: Coin[] = [];
    while (keepSearching) {
      try {
        let listCoins: Coin[] = await this.getCoins(currency, 250, page, sparkline, allowClick);
        // Sleep thread for 30 seconds
        await this.delay(30000);
        console.log(listCoins);
        if (listCoins.length > 0) { listResult.concat(listCoins); }
      } catch (error) {
        console.error(error);
        keepSearching = false;
      }
      page++;
    }
    return listResult;
  }

  getCoins(
    currency: IValueText = ECurrency.USD,
    itemsPerPage: number = 10,
    currentPage: number = 1,
    sparkline: boolean = false,
    allowClick: boolean = true,
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
          map((data: any) => data.map((item: any) => new Coin(currency, item, allowClick)))
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
  ): Promise<Coin[]> {
    // Prepare params
    const pDate = `?date=${this.coreService.formatDate(date)}`;

    // Set params filter
    const urlFilter = `${pDate}`;

    // Set url
    const path = `${this.cApiMainUrl}/coins/${coin.toLowerCase()}/history${urlFilter}`;

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




  /**
 * Get coin price for given date in an specified fiat value from CoinGecko API.
 * 
 * @param coin The coin symbol to get data from. The symbol will be searched on CoinGecko and the associated Id will be obtained.
 * @param date The date to search data. The format has to be: dd-MM-yyyyTHH:mm:ss
 * @param fiat The currency to parse the result (in lowercase).
 * @customfunction
 */
  getMarketChart(coin: string, date: Date, fiat = ECurrency.USD) {
    try {
      if (coin && date) {
        var result = 0;
        var coinGeckoId = this.getCoinGeckoId(coin, fiat);
        if (coinGeckoId !== undefined) {
          var timeStampFrom;
          var timeStampTo;
          if (date instanceof Date) {
            var dateFrom = new Date(new Date(date).setMinutes(0, 0));
            timeStampFrom = dateFrom.getTime().toString();
            var dateTo = new Date(new Date(date).setMinutes(59, 59));
            if (timeStampFrom.length > 10) { timeStampFrom = timeStampFrom.substring(0, 10); }
            timeStampTo = dateTo.getTime().toString();
            if (timeStampTo.length > 10) { timeStampTo = timeStampTo.substring(0, 10); }
          }

          const urlFilter = "?vs_currency=" + fiat.value.toLowerCase() + "&from=" + timeStampFrom + "&to=" + timeStampTo;
          const path = this.cApiMainUrl + "/coins/" + coinGeckoId + "/market_chart/range" + urlFilter;

          return new Promise<Coin[]>((resolve, reject) => {
            this.http.get<string>(path)
              .pipe(first(),
                map((data: any) => data.map((item: any) => new Coin(fiat, item)))
              )
              .subscribe({
                next: (response: Coin[]) => {
                  console.log(response);
                  resolve(response);
                },
                error: (error) => {
                  // this.errorService.manageError(error);
                  reject(error);
                },
              });
          });

          // const json = importJson(url, "prices");
          // if (json) {
          //   var resultList = [];
          //   for (var i = 0; i < json.length; i++) {
          //     var node = json[i][1];
          //     if (node) {
          //       var nodeDate = new Date(node[0]);
          //       var nodePrice = node[1];
          //       resultList.push({ nodeDate, nodePrice });
          //     }
          //   }

          //   var beforedates = resultList.filter(function (d) {
          //     return d.nodeDate - date < 0;
          //   }),
          //     afterdates = resultList.filter(function (d) {
          //       return d.nodeDate - date > 0;
          //     });
          //   result = afterdates[0] ? afterdates[0].nodePrice : beforedates[0].nodePrice;
          // }
          // return result;
        }
      }
    } catch (error) { console.error(error); }
    return 0;
  }

  private async getCoinGeckoId(cointoSearch: string, currency = ECurrency.USD) {
    const listCoins = await this.getCoinsBase(currency);
    return listCoins.find(coin => coin.id === cointoSearch);
  }




  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
