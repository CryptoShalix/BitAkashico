import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchOptions'
})
export class SearchOptionsPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    // This will search and match any option.value that contains the search term
    return items.filter((item) => item != null && item.value != null && filter != null
      && item.value.toLowerCase().includes(filter.toLowerCase())
    );
  }
}

@Pipe({
  name: 'searchCoins'
})
export class SearchCoinsPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }

    // This will search and match any option.value that contains the search term
    return items.filter((item) => item != null && item.name != null && filter != null
      && (item.name.toLowerCase().includes(filter.toLowerCase())
        || item.symbol.toLowerCase().includes(filter.toLowerCase())
      ));
  }
}