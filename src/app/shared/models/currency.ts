import { IValueText, URLS } from './core';

export class ECurrency {
  static USD: IValueText = { value: 'usd', text: '$' };
  static EUR: IValueText = { value: 'eur', text: '€' };
  static GBP: IValueText = { value: 'gbp', text: '£' };
  static YEN: IValueText = { value: 'yen', text: '¥' };
  static BTC: IValueText = { value: 'btc', text: '₿' };

  private static list: Coin[] = [];
  static getList() {
    if (this.list.length === 0) {
      const cur = ECurrency.USD;
      this.list.push(new Coin(cur, { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc' }));
      this.list.push(new Coin(cur, { id: 'ethereum', name: 'Ether', symbol: 'eth' }));
      this.list.push(new Coin(cur, { id: 'litecoin', name: 'Litecoin', symbol: 'ltc' }));
      this.list.push(new Coin(cur, { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'bch' }));
      this.list.push(new Coin(cur, { id: '', name: 'Binance Coin', symbol: 'bnb' }));
      this.list.push(new Coin(cur, { id: '', name: 'EOS', symbol: 'eos' }));
      this.list.push(new Coin(cur, { id: 'ripple', name: 'XRP', symbol: 'xrp' }));
      this.list.push(new Coin(cur, { id: '', name: 'Lumens', symbol: 'xlm' }));
      this.list.push(new Coin(cur, { id: '', name: 'Chainlink', symbol: 'link' }));
      this.list.push(new Coin(cur, { id: '', name: 'Polkadot', symbol: 'dot' }));
      this.list.push(new Coin(cur, { id: '', name: 'Yearn.Finance', symbol: 'yfi' }));
      this.list.push(new Coin(cur, { id: '', name: 'US dollar', symbol: 'usd' }));
      this.list.push(new Coin(cur, { id: '', name: 'United Arab Emirates Dirhams', symbol: 'aed' }));
      this.list.push(new Coin(cur, { id: '', name: 'Argentine peso', symbol: 'ars' }));
      this.list.push(new Coin(cur, { id: '', name: 'Australian dollar', symbol: 'aud' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'bdt' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'bhd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'bmd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'brl' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'cad' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'chf' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'clp' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'cny' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'czk' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'dkk' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'eur' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'gbp' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'hkd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'huf' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'idr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'ils' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'inr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'jpy' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'krw' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'kwd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'lkr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'mmk' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'mxn' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'myr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'ngn' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'nok' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'nzd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'php' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'pkr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'pln' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'rub' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'sar' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'sek' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'sgd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'thb' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'try' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'twd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'uah' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'vef' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'vnd' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'zar' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'xdr' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'xag' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'xau' }));
      this.list.push(new Coin(cur, { id: '', name: '', symbol: 'bits' }));
      this.list.push(new Coin(cur, { id: '', name: 'Satoshi', symbol: 'sats' }));
    }
    return this.list;
  };

  constructor() { }
}

export enum ECoinFormat {
  CARD = 'card',
  FULL = 'full',
  INFO = 'info',
}

export class Coin {
  protected static paramsDefault = {
    id: 'id',
    symbol: 'symbol',
    name: 'name',
    localization: 'localization',
    image: 'image',
    imageThumb: 'thumb',
    imageSmall: 'small',
    marketData: 'market_data',
    marketDataCap: 'market_cap',
    marketDataVolume: 'total_volume',
  };

  protected static paramsExtended = {
    ath: 'ath',
    athChangePercentage: 'ath_change_percentage',
    athDate: 'ath_date',
    atl: 'atl',
    atlChangePercentage: 'atl_change_percentage',
    atlDate: 'atl_date',
    circulatingSupply: 'circulating_supply',
    currentPrice: 'current_price',
    fullyDilutedValuation: 'fully_diluted_valuation',
    high24h: 'high_24h',
    id: 'id',
    image: 'image',
    lastUpdated: 'last_updated',
    low24h: 'low_24h',
    marketCap: 'market_cap',
    marketCapChange24h: 'market_cap_change_24h',
    marketCapChangePercentage24h: 'market_cap_change_percentage_24h',
    marketCapRank: 'market_cap_rank',
    maxSupply: 'max_supply',
    name: 'name',
    priceChange24h: 'price_change_24h',
    priceChangePercentage24h: 'price_change_percentage_24h',
    roi: 'roi',
    symbol: 'symbol',
    totalSupply: 'total_supply',
    totalVolume: 'total_volume',
  };

  id: string;
  symbol: string;
  name: string;
  localization: string;
  imageThumb: string;
  imageSmall: string;
  marketDataPrice: string;
  marketDataCap: string;
  marketDataVolume: string;

  ath: number;
  athChangePercentage: number;
  athDate: Date;
  atl: number;
  atlChangePercentage: number;
  atlDate: Date;
  circulatingSupply: number;
  currentPrice: number;
  fullyDilutedValuation: number;
  high24h: number;
  image: string;
  lastUpdated: Date;
  low24h: number;
  marketCap: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  marketCapRank: number;
  maxSupply: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  roi: number;
  totalSupply: number;
  totalVolume: number;

  currency: IValueText;
  url: string;
  allowClick: boolean;

  constructor(currency: IValueText, data?: any, allowClick: boolean = true) {
    if (data) {
      this.id = data[Coin.paramsDefault.id];
      this.symbol = data[Coin.paramsDefault.symbol];
      this.name = data[Coin.paramsDefault.name];
      this.localization = data[Coin.paramsDefault.localization];
      const image = data[Coin.paramsDefault.image];
      if (image) {
        this.imageThumb = image[Coin.paramsDefault.imageThumb];
        this.imageSmall = image[Coin.paramsDefault.imageSmall];
      }
      const marketData = data[Coin.paramsDefault.marketData];
      if (marketData) {
        this.marketDataPrice = marketData[Coin.paramsExtended.currentPrice][currency.value];
        this.marketDataCap = marketData[Coin.paramsDefault.marketDataCap][currency.value];
        this.marketDataVolume = marketData[Coin.paramsDefault.marketDataVolume][currency.value];
      }

      this.ath = data[Coin.paramsExtended.ath];
      this.athChangePercentage = data[Coin.paramsExtended.athChangePercentage];
      this.athDate = data[Coin.paramsExtended.athDate];
      this.atl = data[Coin.paramsExtended.atl];
      this.atlChangePercentage = data[Coin.paramsExtended.atlChangePercentage];
      this.atlDate = data[Coin.paramsExtended.atlDate];
      this.circulatingSupply = data[Coin.paramsExtended.circulatingSupply];
      this.currentPrice = data[Coin.paramsExtended.currentPrice];
      this.fullyDilutedValuation = data[Coin.paramsExtended.fullyDilutedValuation];
      this.high24h = data[Coin.paramsExtended.high24h];
      this.image = data[Coin.paramsExtended.image];
      this.lastUpdated = data[Coin.paramsExtended.lastUpdated];
      this.low24h = data[Coin.paramsExtended.low24h];
      this.marketCap = data[Coin.paramsExtended.marketCap];
      this.marketCapChange24h = data[Coin.paramsExtended.marketCapChange24h];
      this.marketCapChangePercentage24h = data[Coin.paramsExtended.marketCapChangePercentage24h];
      this.marketCapRank = data[Coin.paramsExtended.marketCapRank];
      this.maxSupply = data[Coin.paramsExtended.maxSupply];
      this.priceChange24h = data[Coin.paramsExtended.priceChange24h];
      this.priceChangePercentage24h = data[Coin.paramsExtended.priceChangePercentage24h];
      this.roi = data[Coin.paramsExtended.roi];
      this.totalSupply = data[Coin.paramsExtended.totalSupply];
      this.totalVolume = data[Coin.paramsExtended.totalVolume];
    }

    this.currency = currency;
    this.url = `${URLS.COINGECKO}${this.id}`;
    this.allowClick = allowClick;
  }
}