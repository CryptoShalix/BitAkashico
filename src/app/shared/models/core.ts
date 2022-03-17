export const REFERRAL_CODE = {
  Bit2Me: 'RQB-RWI-ECZ',
};

export enum URLS {
  // SOCIAL MEDIA
  TWITTER = 'https://twitter.com/CryptoShalix',
  DISCORD = 'https://discord.gg/9QQhZhn3Gc',
  TELEGRAM = 'https://t.me/CryptoShalixES',
  YOUTUBE = 'https://www.youtube.com/channel/UCde7n5s8Ed1OAlq46k_MBVA',

  // PLATFORMS
  COINGECKO = 'https://www.coingecko.com/en/coins/',
  BIT2ME_BUY = 'https://bit2me.com/buy-',

  // REFERRALS
  REF_CoinGecko = 'https://www.coingecko.com',
  REF_CoinMarketCap = 'https://www.coinmarketcap.com/invite?ref=Z97Z1PVC',
  REF_Lunarcrush = 'https://www.lunarcrush.com',
  REF_GoogleTrends = 'https://trends.google.es/trends/explore',
  REF_DefiLlama = 'https://defillama.com',
  REF_TradingView = 'https://www.tradingview.com',
  REF_CoinMarketCal = 'https://coinmarketcal.com',
  REF_BitcoinRainbowChart = 'https://www.blockchaincenter.net/bitcoin-rainbow-chart',
  REF_Chainlist = 'https://chainlist.org',
  REF_PooCoin = 'poocoin.app',
  REF_StaySafu = 'app.staysafu.org',
  REF_BSCheck = 'bscheck.eu',
  REF_Justbuitffs = 'apps.justbuitffs.com',
  REF_DexTools = 'dextools.io/app',
  REF_MoonArch = 'moonarch.app',
  REF_Honeypot = 'honeypot.is',
  REF_RugPullDetector = 'rugpulldetector.com',
  REF_DexGuru = 'dex.guru',
  REF_RugDoc = 'rugdoc.io',
  REF_Mudra = 'mudra.website',
  REF_BoggedFinance = 'bogged.finance',
}

export interface IValueText {
  value: string;
  text: string;
}

export class ValueText {
  protected static parameters = {
    value: 'value',
    text: 'text',
  };

  value: string;
  text: string;

  constructor(value: string, text: string) {
    this.value = value;
    this.text = text;
  }
}

export enum EDateFormat {
  short = 'ddMMyyyy',
  shortDash = 'dd-MM-yyyy',
  shortSlash = 'dd/MM/yyyy',
  long = 'ddMMyyyyTHH:mm:ss',
  longDash = 'dd-MM-yyyy HH:mm:ss',
  longSlash = 'dd/MM/yyyy HH:mm:ss',
}

export interface IAccordionItem {
  text: string;
  link: string;
  description: string;
  icon?: string;
  image?: string;
  rank?: number;
}

export interface IAccordion {
  title: string;
  items: IAccordionItem[];
  description: string;
  icon?: string;
  disabled?: boolean;
}
