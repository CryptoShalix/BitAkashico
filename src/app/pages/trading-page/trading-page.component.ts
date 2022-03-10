import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/shared/services/coingecko.service';

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
  coins = [];

  constructor(
    private coingeckoService: CoingeckoService
  ) { }

  ngOnInit(): void {
    const coin = 'bitcoin';
    const date = new Date();
    // this.coingeckoService.getCoinByDate(coin, date);
  }
}
