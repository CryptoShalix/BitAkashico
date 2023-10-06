import { IMAGES } from 'src/assets/images/images';
import { LinkableIcon, ELinkableIconType, ELinkableTarget } from '../components/linkable-icon/linkable-icon';

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