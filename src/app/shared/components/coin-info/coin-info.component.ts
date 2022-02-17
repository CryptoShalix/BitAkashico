import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { Coin } from '../../models/currency';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss']
})
export class CoinComponent {
  coinItem: Coin;

  @Input() set sCoinItem(item: Coin) {
    this.coinItem = item;
  }

  constructor(
    private coreService: CoreService,
  ) {
    console.log(this.sCoinItem);
  }
}
