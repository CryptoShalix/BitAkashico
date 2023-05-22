import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Coin } from '../../models/currency';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-modal-selector',
  templateUrl: './modal-selector.component.html',
  styleUrls: ['./modal-selector.component.scss']
})
export class ModalSelectorComponent {
  // INPUT VARIABLES
  @Input() set setShow(show: boolean) {
    this.showModalDialog = show;
  }
  @Input() set setMultiple(multiple: boolean) {
    this.multiple = multiple;
  }
  @Input() set setTitle(title: string) {
    this.title = title;
  }
  @Input() set setListOrigin(listOrigin: any[]) {
    this.coins = listOrigin;
  }

  showModalDialog = false;
  multiple = true;
  title: string = '';

  // MODAL SELECTOR VARIABLES
  @ViewChild('inputSearchCoin', { static: false }) inputSearchCoin: ElementRef;
  @ViewChild(MatSelectionList) coinsListSelector: MatSelectionList;

  private _MIN_CHAR_SEARCH = 3;

  coins: Coin[] = [];
  coinsFiltered: Coin[] = [];
  coinsPortfolio: Coin[] = [];
  coinsPortfolioSelected: Coin[] = [];

  constructor() { }

  onSearchCoinClear() {
    this.inputSearchCoin.nativeElement.value = '';
    this.clearFilter();
  }

  onSelectedCoin(coin: Coin) {
    this.coinsPortfolioSelected.push(coin);
  }

  applyFilter(event: Event) {
    // Clear all
    this.clearFilter();

    // Get input text and filter main list
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length >= this._MIN_CHAR_SEARCH) {
      this.coinsFiltered = this.filterList(this.coins, filterValue.trim().toLowerCase());
    }
  }

  private clearFilter() {
    this.coinsListSelector.deselectAll();
    this.coinsFiltered = [];
  }

  private filterList(list: any[], value: string) {
    return list.filter(item =>
      item.id.toLowerCase().includes(value) ||
      item.symbol.toLowerCase().includes(value) ||
      item.name.toLowerCase().includes(value)
    );
  }
}