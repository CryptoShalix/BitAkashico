import { Component, Input } from '@angular/core';

import { Coin, ECoinFormat } from '../../models/currency';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrls: ['./coin-info.component.scss']
})
export class CoinComponent {
  @Input() type: ECoinFormat = ECoinFormat.INFO;
  @Input() set sCoinItem(item: Coin) {
    this.coinItem = item;
  }

  coinItem: Coin;

  constructor(
    private coreService: CoreService
  ) { }

  onItemClick(): void {
    if (this.coinItem.allowClick) {
      this.coreService.navigateTo(this.coinItem.url);
    }
  }
}
