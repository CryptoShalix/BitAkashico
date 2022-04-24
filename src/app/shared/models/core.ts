export const REFERRAL_CODE = {
  Bit2Me: 'RQB-RWI-ECZ',
};

export enum URLS {
  // SOCIAL MEDIA
  TWITTER = 'https://twitter.com/CryptoShalix',
  DISCORD = 'https://discord.gg/9QQhZhn3Gc',
  TELEGRAM = 'https://t.me/CryptoShalixES',
  YOUTUBE = 'https://www.youtube.com/channel/UCde7n5s8Ed1OAlq46k_MBVA',

  // WALLETS
  ZEBEDEE_LNTAG = 'cryptoshalix@zbd.gg',
  ZEBEDEE_LNURL = 'lnurl1dp68gurn8ghj7ctsdyh85etzv4jx2efwd9hj7a3s9aex2ut4v4ehgttnw3shg6tr943ksctjvajhxtm98q6kvefkxccz6vp4xyuz6dp3xenz6wfjvguz6vmxvverzwp5v5ux2vmph0ayvm',
  MUUN_LNURL = 'lnbc1p3xtxdwpp58kprr74p9kwqszkrglv7glaqgdgez5lhaljpvrl9m3lnutzudtfsdqqcqzzgxqyz5vqrzjqw8c7yfutqqy3kz8662fxutjvef7q2ujsxtt45csu0k688lkzu3ldyxj5syt2ry8avqqqqryqqqqthqqpysp5uk36axz40yd572eh82wrwan6mnk8nf7tnz4ggpssj64e9gzkz4nq9qypqsq9fwwdn22d33txk2ftt6ufe7ucv0ufpsf0e4zyp3qleutztr0acs960qdte4vdvvqvtp4yauear9zfcvlhspr9j9243dkwtv9dghyp6cq4qr3de',

  // PLATFORMS
  COINGECKO = 'https://www.coingecko.com/en/coins/',
  BIT2ME_BUY = 'https://bit2me.com/buy-',

  // REFERRALS: ANALYSIS MARKET
  REF_CoinGecko = 'https://www.coingecko.com',
  REF_CoinMarketCap = 'https://www.coinmarketcap.com/invite?ref=Z97Z1PVC',
  REF_CoinMarketCal = 'https://coinmarketcal.com',
  REF_DefiLlama = 'https://defillama.com',
  REF_GoogleTrends = 'https://trends.google.es/trends/explore',
  REF_Lunarcrush = 'https://www.lunarcrush.com',

  // REFERRALS: ANALYSIS TECHNICAL
  REF_TradingView = 'https://www.tradingview.com',

  // REFERRALS: BITCOIN TOOLS
  REF_BitcoinRainbowChart = 'https://www.blockchaincenter.net/bitcoin-rainbow-chart',
  REF_KYCP = 'https://kycp.org',
  REF_StackerNews = 'https://stacker.news',

  // REFERRALS: BITCOIN WALLETS
  REF_BlueWallet = 'https://bluewallet.io',
  REF_MuunWallet = 'https://muun.com',
  REF_SamouraiWallet = 'https://samouraiwallet.com',
  REF_SparrowWallet = 'https://sparrowwallet.com',
  REF_SpecterWallet = 'https://specter.solutions',
  REF_WalletOfSatoshi = 'https://walletofsatoshi.com',
  REF_Zap = 'https://zaphq.io',
  REF_Zebedee = 'https://zebedee.io',

  // REFERRALS: EXCHANGES CEX
  REF_Binance = 'https://www.binance.com/en/register?ref=EEICFSED',
  REF_Bit2Me = 'https://bit2me.com/es/registro?r=RQB-RWI-ECZ',
  REF_BingX = 'https://bingx.com/invite/HWIXFQKZ',
  REF_CryptoCom = 'https://crypto.com/exch/fjfnrhzmm7',
  REF_FTX = 'https://ftx.com/#a=Shalix',
  REF_Gemini = 'https://gemini.com/share/vgwvknzt8',
  REF_KuCoin = 'https://www.kucoin.com/ucenter/signup?rcode=rJ59448',
  REF_Nexo = 'https://nexo.io/ref/mdqndmt0yw',
  REF_Wirex = 'https://wirexapp.com/r/CryptoShalix',

  // REFERRALS: EXCHANGES DEX
  REF_PancakeSwap = 'https://pancakeswap.finance',
  REF_BoggedFinance = 'https://bogged.finance',
  REF_DexGuru = 'https://dex.guru',
  REF_DexTools = 'https://dextools.io/app',
  REF_PooCoin = 'https://poocoin.app',

  // REFERRALS: WALLETS
  REF_BraveWallet = '',
  REF_Metamask = '',
  REF_Safepal = '',
  REF_TrustWallet = '',

  // REFERRALS: OTHERS
  REF_BSCheck = 'https://bscheck.eu',
  REF_Chainlist = 'https://chainlist.org',
  REF_Honeypot = 'https://honeypot.is',
  REF_Justbuitffs = 'https://apps.justbuitffs.com',
  REF_MoonArch = 'https://moonarch.app',
  REF_Mudra = 'https://mudra.website',
  REF_RugDoc = 'https://rugdoc.io',
  REF_RugPullDetector = 'https://rugpulldetector.com',
  REF_StaySafu = 'https://app.staysafu.org',
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
