import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { Coin } from '../../models/currency';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  coins: Coin[];

  @Input() set sCoins(items: Coin[]) {
    this.coins = items;
    console.log(this.coins);
  }

  constructor(
    private coreService: CoreService,
  ) { }
}
