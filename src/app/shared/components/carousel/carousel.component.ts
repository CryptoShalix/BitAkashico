import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription, timer } from 'rxjs';

import { CoingeckoService } from '../../services/coingecko.service';

import { Coin, ECoinFormat, ECurrency } from '../../models/currency';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  private callTiming = 30;
  private timerSubscription: Subscription;

  coinsToShow = 100;
  carouselTiming = this.coinsToShow * 3;
  coinFormat = ECoinFormat.INFO;
  coins: Coin[];

  constructor(
    private coingeckoService: CoingeckoService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData(): Promise<void> {
    this.timerSubscription = timer(0, this.callTiming * 1000).pipe(map(async () => {
      this.coins = await this.coingeckoService.getCoins(ECurrency.USD, this.coinsToShow);
    })).subscribe();
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }
}
