import { Component, OnInit } from '@angular/core';

import { Coin, ECurrency } from 'src/app/shared/models/currency';

import { CoingeckoService } from 'src/app/shared/services/coingecko.service';
import { IValueText } from '../../shared/models/core';

@Component({
  selector: 'app-trading-page',
  templateUrl: './trading-page.component.html',
  styleUrls: ['./trading-page.component.scss']
})
export class TradingPageComponent implements OnInit {
  /**
   * Get charts component from here:
   * - GitHub: https://github.com/apexcharts/ng-apexcharts
   * - Demo: https://codesandbox.io/s/apx-candlestick-basic-1j7me?from-embed=&file=/src/app/app.module.ts
   */

  isBuying = true;
  coins: Coin[] = [];
  coinsOrigin: Coin[] = [];
  coinsDestination: Coin[] = [];
  coinSelectedOrigin: string;
  coinSelectedDestination: string = ''//ECurrency.USD.value;

  constructor(
    private coingeckoService: CoingeckoService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getCoins();
  }

  private async getCoins(): Promise<void> {
    this.coins = await this.coingeckoService.getCoins(ECurrency.BTC, 250);
    this.coinsDestination = await this.coingeckoService.getSupportedCurrencies();
    this.coinsOrigin = this.coins;
  }

  filterValueOrigin(searchValue: any): void {
    if (searchValue != null && searchValue.value != null) {
      this.coinSelectedOrigin = searchValue.value;
    }
  }

  filterValueDestination(searchValue: any): void {
    if (searchValue != null && searchValue.value != null) {
      this.coinSelectedDestination = searchValue.value;
    }
  }
}
