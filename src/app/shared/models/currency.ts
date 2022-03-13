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

export enum EBit2MeCoins {
  B2M = 'B2M',
  BTC = 'BTC',
  ETH = 'ETH',
  BCH = 'BCH',
  LTC = 'LTC',
  DASH = 'DASH',
  XRP = 'XRP',
  ADA = 'ADA',
  LINK = 'LINK',
  COMP = 'COMP',
  ATOM = 'ATOM',
  DAI = 'DAI',
  XMR = 'XMR',
  OMG = 'OMG',
  DOT = 'DOT',
  SC = 'SC',
  XLM = 'XLM',
  USDT = 'USDT',
  USDC = 'USDC',
  ZEC = 'ZEC',
  XTZ = 'XTZ',
  UNI = 'UNI',
  AAVE = 'AAVE',
  ANT = 'ANT',
  BAT = 'BAT',
  BAL = 'BAL',
  FIL = 'FIL',
  WAVES = 'WAVES',
  KSM = 'KSM',
  YFI = 'YFI',
  CRV = 'CRV',
  NANO = 'NANO',
  TRX = 'TRX',
  FLOW = 'FLOW',
  ICX = 'ICX',
  KNC = 'KNC',
  SNX = 'SNX',
  QTUM = 'QTUM',
  KAVA = 'KAVA',
  MANA = 'MANA',
  ALGO = 'ALGO',
  MLN = 'MLN',
  ETC = 'ETC',
  GNO = 'GNO',
  KEEP = 'KEEP',
  LSK = 'LSK',
  OCEAN = 'OCEAN',
  OXT = 'OXT',
  GRT = 'GRT',
  EWT = 'EWT'
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

  constructor(currency: IValueText, data?: any) {
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
  }
}
