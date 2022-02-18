import { IValueText, URLS } from './core';

export class ECurrency {
  static USD: IValueText = { value: 'usd', text: '$' };
  static EUR: IValueText = { value: 'eur', text: '€' };
  static GBP: IValueText = { value: 'gbp', text: '£' };
  static YEN: IValueText = { value: 'yen', text: '¥' };
  static BTC: IValueText = { value: 'btc', text: '₿' };
  static BTC_ALT: IValueText = { value: 'btc_alt', text: '฿' };

  constructor() { }
}

export enum ECoinFormat {
  CARD = 'card',
  FULL = 'full',
  INFO = 'info',
}

export class Coin {
  protected static parameters = {
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
  id: string;
  image: string;
  lastUpdated: Date;
  low24h: number;
  marketCap: number;
  marketCapChange24h: number;
  marketCapChangePercentage24h: number;
  marketCapRank: number;
  maxSupply: number;
  name: string;
  priceChange24h: number;
  priceChangePercentage24h: number;
  roi: number;
  symbol: string;
  totalSupply: number;
  totalVolume: number;

  currency: IValueText;
  url: string;

  constructor(currency: IValueText, data?: any) {
    if (data) {
      this.ath = data[Coin.parameters.ath];
      this.athChangePercentage = data[Coin.parameters.athChangePercentage];
      this.athDate = data[Coin.parameters.athDate];
      this.atl = data[Coin.parameters.atl];
      this.atlChangePercentage = data[Coin.parameters.atlChangePercentage];
      this.atlDate = data[Coin.parameters.atlDate];
      this.circulatingSupply = data[Coin.parameters.circulatingSupply];
      this.currentPrice = data[Coin.parameters.currentPrice];
      this.fullyDilutedValuation = data[Coin.parameters.fullyDilutedValuation];
      this.high24h = data[Coin.parameters.high24h];
      this.id = data[Coin.parameters.id];
      this.image = data[Coin.parameters.image];
      this.lastUpdated = data[Coin.parameters.lastUpdated];
      this.low24h = data[Coin.parameters.low24h];
      this.marketCap = data[Coin.parameters.marketCap];
      this.marketCapChange24h = data[Coin.parameters.marketCapChange24h];
      this.marketCapChangePercentage24h = data[Coin.parameters.marketCapChangePercentage24h];
      this.marketCapRank = data[Coin.parameters.marketCapRank];
      this.maxSupply = data[Coin.parameters.maxSupply];
      this.name = data[Coin.parameters.name];
      this.priceChange24h = data[Coin.parameters.priceChange24h];
      this.priceChangePercentage24h = data[Coin.parameters.priceChangePercentage24h];
      this.roi = data[Coin.parameters.roi];
      this.symbol = data[Coin.parameters.symbol];
      this.totalSupply = data[Coin.parameters.totalSupply];
      this.totalVolume = data[Coin.parameters.totalVolume];
    }
    this.currency = currency;
    this.url = `${URLS.COINGECKO}${this.id}`;
  }
}
