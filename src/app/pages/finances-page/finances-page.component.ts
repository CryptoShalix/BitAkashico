import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IValueText } from 'src/app/shared/models/core';

import { Coin, ECurrency } from 'src/app/shared/models/currency';

import { CoingeckoService } from 'src/app/shared/services/coingecko.service';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-finances-page',
  templateUrl: './finances-page.component.html',
  styleUrls: ['./finances-page.component.scss']
})
export class FinancesPageComponent implements OnInit {
  /**
   * Get charts component from here:
   * - GitHub: https://github.com/apexcharts/ng-apexcharts
   * - Demo: https://codesandbox.io/s/apx-candlestick-basic-1j7me?from-embed=&file=/src/app/app.module.ts
   */

  coins: Coin[] = [];
  coinsFiltered: Coin[] = [];
  coinsCurrency: Coin[] = [];
  coinsCurrencySelected: Coin[] = [];
  coinSelectedOrigin: string = ECurrency.USD.value;
  selectedCurrency(): IValueText { return { value: this.coinSelectedOrigin, text: '' }; }

  displayedColumns: string[] = ['name', 'symbol', 'currentPrice'];
  dataSource: MatTableDataSource<Coin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private coreService: CoreService,
    private coingeckoService: CoingeckoService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private async getData() {
    await this.getCoins();
  }

  async getCoins(): Promise<void> {
    try {
      console.log(this.coinSelectedOrigin);
      this.coins = await this.coingeckoService.getCoinsBase();
      this.coinsFiltered = this.coins.filter(c => c.symbol.toLowerCase().includes('btc'));
      // this.coins = await this.coingeckoService.getAllCoins(this.selectedCurrency());
      this.coreService.showMessage('Loading coins.<br/>Current amount: ' + this.coins.length);
      this.setDataSource();
    } catch (error) { console.log(error); }
  }

  private setDataSource() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.coinsFiltered);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSelectedCurrency(event: any) {
    console.log(event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // filterValueOrigin(searchValue: any): void {
  //   if (searchValue != null && searchValue.value != null) {
  //     this.coinSelectedOrigin = searchValue.value;
  //   }
  // }

  // filterValueDestination(searchValue: any): void {
  //   if (searchValue != null && searchValue.value != null) {
  //     this.coinSelectedDestination = searchValue.value;
  //   }
  // }
}
