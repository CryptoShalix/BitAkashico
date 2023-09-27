import { IMAGES } from 'src/assets/images/images';
import { ELinkableIconType, ELinkableTarget, LinkableIcon } from '../components/linkable-icon/linkable-icon';

export enum URLS {
  // SOCIAL MEDIA
  TWITTER = 'https://twitter.com/CryptoShalix',
  DISCORD = 'https://discord.gg/9QQhZhn3Gc',
  TELEGRAM = 'https://t.me/BitAkashico',
  YOUTUBE = 'https://www.youtube.com/@BitAkashico',

  // WALLETS
  ZEBEDEE_LNTAG = 'cryptoshalix@zbd.gg',
  ZEBEDEE_LNQR = './assets/images/ln_qr_zebedee.png',
  ZEBEDEE_LNURL = 'lnurl1dp68gurn8ghj7ctsdyh85etzv4jx2efwd9hj7a3s9aex2ut4v4ehgttnw3shg6tr943ksctjvajhxtm98q6kvefkxccz6vp4xyuz6dp3xenz6wfjvguz6vmxvverzwp5v5ux2vmph0ayvm',
  PAYNYM = '+shinysalad643',
  PAYPAL_QR = './assets/images/fiat_qr_paypal.png',
  PAYPAL_URL = 'https://www.paypal.com/qrcodes/managed/0aec90a0-d492-45da-8038-bd9f9fa5fb72?utm_source=consweb_more',

  // PLATFORMS
  COINGECKO = 'https://www.coingecko.com/en/coins/',
  BIT2ME_BUY = 'https://bit2me.com/buy-',

  // REFERRALS: GAMES
  REF_GAME_BOUNCE = 'https://bitcoinbounce.thndr.games/r/shalix',
  REF_GAME_TURBO84 = 'https://turbo84.thndr.games/r/shalix',
  REF_GAME_SNAKE = 'https://bitcoinsnake.thndr.games/r/shalix',
  REF_GAME_BAY = 'https://bitcoinbay.thndr.games/r/shalix',
  REF_GAME_SOLITAIRE = 'https://solitaire.thndr.games/r/KPoa',
  REF_GAME_MINER = 'https://zebedee.io/app',

  REF_GAME_AND_BOUNCE = 'https://bitcoin-bounce.sng.link/Ddomi/mvbj/n2fl',
  REF_GAME_AND_TURBO84 = 'https://turbo84.sng.link/Dbgmr/9tud9/9wff',
  REF_GAME_AND_SNAKE = 'https://bitcoin-snake.sng.link/Diskp/geum/3abn',
  REF_GAME_AND_BAY = 'https://thndr-bay.sng.link/Dk8fg/s8iy/vbo5',
  REF_GAME_AND_SOLITAIRE = 'https://bitcoin-solitaire.sng.link/Dx606/hp39/kvzf',
  REF_GAME_AND_MINER = 'https://play.google.com/store/apps/details?id=com.fumbgames.bitcoinminor',

  REF_GAME_IOS_BOUNCE = 'https://bitcoin-bounce.sng.link/Ddomi/01rz/u50x',
  REF_GAME_IOS_TURBO84 = 'https://turbo84.sng.link/Dbgmr/b7kl/8vys',
  REF_GAME_IOS_SNAKE = 'https://bitcoin-snake.sng.link/Diskp/q2fr/u2ex',
  REF_GAME_IOS_BAY = 'https://thndr-bay.sng.link/Dk8fg/5lrf/d0c9',
  REF_GAME_IOS_SOLITAIRE = 'https://bitcoin-solitaire.sng.link/Dx606/kbea/04tp',
  REF_GAME_IOS_MINER = 'https://apps.apple.com/us/app/bitcoin-miner-idle-tycoon/id1413770650',
}

export interface IAPP {
  name: string;
  link: string;
  rank: number;
  isLN?: boolean;
}

export class APP {
  name: string;
  text: string;
  link: string;
  description: string;
  image: string;
  rank: number;
  isLN: boolean;

  constructor(app: IAPP, groupName: string) {
    this.name = app.name;
    this.text = (app.isLN ? '[LN] ' : '') + app.name;
    this.link = app.link;
    this.description = `PAGES.TOOLS.GROUPS.${groupName}.app${app.name.replace(/\s/g, '')}`;
    this.image = '';
    this.rank = app.rank;
    this.isLN = app.isLN ? true : false;
    return this;
  }
}

export interface IAPP_GROUP {
  groupName: string;
  items: IAPP[];
  icon: string;
}

export class APP_GROUP {
  groupName: string;
  title: string;
  description: string;
  icon: string;
  items: APP[];

  constructor(appGroup: IAPP_GROUP) {
    this.groupName = appGroup.groupName;
    this.title = `PAGES.TOOLS.GROUPS.${this.groupName}.title`;
    this.description = `PAGES.TOOLS.GROUPS.${this.groupName}.description`;
    this.icon = appGroup.icon;
    this.items = appGroup.items.map(app => new APP(app, this.groupName));
  }
}

export interface IBOOK {
  name: string;
  urlRead: string;
  urlBuy: string;
  image: string;
  side: string; // choose between bit; aka; com
  li_read: LinkableIcon;
  li_buy: LinkableIcon;
}

export class BOOKS {
  private static booksPath = './assets/images/books/';

  static mapModel(book: IBOOK) {
    book.image = this.getImagePath(book.name, book.side);
    book.li_read = new LinkableIcon('', {
      href: book.urlRead,
      title: book.name,
      tooltip: 'MSG.readDownload',
      iconPath: 'download',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.BLANK,
      showText: false,
    });
    book.li_buy = new LinkableIcon('', {
      href: book.urlBuy,
      title: book.name,
      tooltip: 'MSG.buyAmazon',
      iconPath: IMAGES.SHOP_AMAZON,
      color: '#fff',
      type: ELinkableIconType.IMAGE,
      target: ELinkableTarget.BLANK,
      showText: false,
    });
  }

  static getImagePath(name: string, side: string) {
    const bookPath = `${this.booksPath}${side === 'com' ? '' : side}/`;
    const image = `${bookPath}${name.toLowerCase()}.png`;
    return image;
  }
}

export enum BUTTONS {
  dialogAccept = 'BUTTONS.accept',
  dialogCancel = 'BUTTONS.cancel'
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

export interface ITestimonial {
  text: string;
  name: string;
}