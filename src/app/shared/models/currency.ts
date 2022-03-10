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

export class CoinDefault {
  protected static parameters = {
    id: 'id',
    symbol: 'symbol',
    name: 'name',
    localization: 'localization',
    image: 'image',
    imageThumb: 'thumb',
    imageSmall: 'small',
    marketData: 'market_data',
    marketDataPrice: 'current_price',
    marketDataCap: 'market_cap',
    marketDataVolume: 'total_volume',
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

  currency: IValueText;
  url: string;

  constructor(currency: IValueText, data?: any) {
    if (data) {
      this.id = data[CoinDefault.parameters.id];
      this.symbol = data[CoinDefault.parameters.symbol];
      this.name = data[CoinDefault.parameters.name];
      this.localization = data[CoinDefault.parameters.localization];
      const image = data[CoinDefault.parameters.image];
      this.imageThumb = image[CoinDefault.parameters.imageThumb];
      this.imageSmall = image[CoinDefault.parameters.imageSmall];
      const marketData = data[CoinDefault.parameters.marketData];
      this.marketDataPrice = marketData[CoinDefault.parameters.marketDataPrice][currency.value];
      this.marketDataCap = marketData[CoinDefault.parameters.marketDataCap][currency.value];
      this.marketDataVolume = marketData[CoinDefault.parameters.marketDataVolume][currency.value];
    }

    this.currency = currency;
    this.url = `${URLS.COINGECKO}${this.id}`;
  }
}

export class Coin extends CoinDefault {
  protected static parametersExtended = {
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

  constructor(currency: IValueText, data?: any) {
    super(currency, data);
    if (data) {
      this.ath = data[Coin.parametersExtended.ath];
      this.athChangePercentage = data[Coin.parametersExtended.athChangePercentage];
      this.athDate = data[Coin.parametersExtended.athDate];
      this.atl = data[Coin.parametersExtended.atl];
      this.atlChangePercentage = data[Coin.parametersExtended.atlChangePercentage];
      this.atlDate = data[Coin.parametersExtended.atlDate];
      this.circulatingSupply = data[Coin.parametersExtended.circulatingSupply];
      this.currentPrice = data[Coin.parametersExtended.currentPrice];
      this.fullyDilutedValuation = data[Coin.parametersExtended.fullyDilutedValuation];
      this.high24h = data[Coin.parametersExtended.high24h];
      this.image = data[Coin.parametersExtended.image];
      this.lastUpdated = data[Coin.parametersExtended.lastUpdated];
      this.low24h = data[Coin.parametersExtended.low24h];
      this.marketCap = data[Coin.parametersExtended.marketCap];
      this.marketCapChange24h = data[Coin.parametersExtended.marketCapChange24h];
      this.marketCapChangePercentage24h = data[Coin.parametersExtended.marketCapChangePercentage24h];
      this.marketCapRank = data[Coin.parametersExtended.marketCapRank];
      this.maxSupply = data[Coin.parametersExtended.maxSupply];
      this.priceChange24h = data[Coin.parametersExtended.priceChange24h];
      this.priceChangePercentage24h = data[Coin.parametersExtended.priceChangePercentage24h];
      this.roi = data[Coin.parametersExtended.roi];
      this.totalSupply = data[Coin.parametersExtended.totalSupply];
      this.totalVolume = data[Coin.parametersExtended.totalVolume];
    }
  }
}
