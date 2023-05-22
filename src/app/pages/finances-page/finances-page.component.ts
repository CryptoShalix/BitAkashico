import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
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
  private _MIN_CHAR_SEARCH = 3;

  // ALL COINS (NO PRICE)
  coins: Coin[] = [];
  coinsFiltered: Coin[] = [];

  coinsPortfolio: Coin[] = [];
  coinsPortfolioSelected: Coin[] = [];

  coinsCurrency: Coin[] = [];
  coinsCurrencySelected: Coin[] = [];
  coinSelectedOrigin: string = ECurrency.USD.value;
  selectedCurrency(): IValueText { return { value: this.coinSelectedOrigin, text: '' }; }

  displayedColumns: string[] = ['name', 'symbol', 'currentPrice'];
  dataSource: MatTableDataSource<Coin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // @ViewChild('inputSearchCoin', { static: false }) inputSearchCoin: ElementRef;
  // @ViewChild(MatSelectionList) coinsListSelector: MatSelectionList;

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
      // this.coins = await this.coingeckoService.getAllCoins(this.selectedCurrency());
      // this.coreService.showMessage('Loading coins.<br/>Current amount: ' + this.coins.length);
      // this.setDataSource();
    } catch (error) { console.log(error); }
  }

  // onSelectedCoin(coin: Coin) {
  //   this.coinsPortfolioSelected.push(coin);
  // }

  // onSearchCoinClear() {
  //   this.inputSearchCoin.nativeElement.value = '';
  //   this.clearFilter();
  // }

  onSavePortfolio() {
    console.log(this.coinsPortfolioSelected);

    this.coinsPortfolio = this.coinsPortfolio.concat(this.coinsPortfolioSelected);
    console.log(this.coinsPortfolio);
    this.setDataSource();
  }

  // applyFilter(event: Event) {
  //   // Clear all
  //   this.clearFilter();

  //   // Get input text and filter main list
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   if (filterValue.length >= this._MIN_CHAR_SEARCH) {
  //     this.coinsFiltered = this.filterList(this.coins, filterValue.trim().toLowerCase());
  //   }

  //   // this.setDataSource();
  //   // this.dataSource.filter = filterValue.trim().toLowerCase();

  //   // if (this.dataSource.paginator) {
  //   //   this.dataSource.paginator.firstPage();
  //   // }
  // }

  // private clearFilter() {
  //   this.coinsListSelector.deselectAll();
  //   this.coinsFiltered = [];
  // }

  // private filterList(list: any[], value: string) {
  //   return list.filter(item =>
  //     item.id.toLowerCase().includes(value) ||
  //     item.symbol.toLowerCase().includes(value) ||
  //     item.name.toLowerCase().includes(value)
  //   );
  // }

  private setDataSource() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.coinsPortfolio);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
