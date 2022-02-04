import { IMAGES } from 'src/assets/images/images';

export enum ELinkableIcon {
  Home = 'Crypto Shalix',
  Twitter = 'Twitter',
  Discord = 'Discord',
  Telegram = 'Telegram',
  Youtube = 'Youtube',
}

export enum ELinkableIconType {
  ICON = 'icon',
  IMAGE = 'image',
  SVG = 'svg',
}

export enum ELinkableTarget {
  SELF = '_self',
  BLANK = '_blank',
}

export interface ILinkableIcon {
  title?: string;
  href?: string;
  path?: string;
  tooltip?: string;
  color?: string;
  target?: string;
  showText?: boolean;
  isCard?: boolean;
  type?: ELinkableIconType;
}

export class LinkableIcon {
  public id: string;
  public label: string;
  public title: string;
  public path: string;
  public href: string;
  public tooltip: string;
  public color: string;
  public isCard: boolean;
  public isSVG: boolean;
  public isImage: boolean;
  public showText: boolean;
  public target: string;

  constructor(
    id: string | ELinkableIcon,
    linkableIcon?: ILinkableIcon,
  ) {
    const title = linkableIcon?.title;
    const href = linkableIcon?.href;
    const tooltip = linkableIcon?.tooltip;
    const color = linkableIcon?.color;
    const path = linkableIcon?.path;
    let target = linkableIcon?.target;
    let showText = linkableIcon && linkableIcon.showText ? true : false;
    this.isCard = linkableIcon && linkableIcon.isCard ? true : false;
    this.isImage = false;
    this.isSVG = false;

    switch (linkableIcon?.type) {
      case ELinkableIconType.IMAGE: this.isImage = true; break;
      case ELinkableIconType.SVG: this.isSVG = true; break;
      default:
        this.isImage = false;
        this.isSVG = false;
        break;
    }

    switch (id) {
      case ELinkableIcon.Home:
        this.id = title ? title : ELinkableIcon.Home.toLowerCase();
        this.title = title ? title : ELinkableIcon.Home;
        this.href = '/';
        this.path = IMAGES.HOME_SVG;
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        target = ELinkableTarget.SELF;
        showText = linkableIcon && linkableIcon.showText !== undefined ? linkableIcon.showText : true;
        break;
      case ELinkableIcon.Twitter:
        this.id = ELinkableIcon.Twitter.toLowerCase();
        this.title = title ? title : ELinkableIcon.Twitter;
        this.href = href ? href : 'https://twitter.com/CryptoShalix';
        this.path = this.setSVGComponent(IMAGES.Twitter);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = color ? color : '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Discord:
        this.id = ELinkableIcon.Discord.toLowerCase();
        this.title = title ? title : ELinkableIcon.Discord;
        this.href = 'https://discord.gg/9QQhZhn3Gc';
        this.path = this.setSVGComponent(IMAGES.Discord);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Telegram:
        this.id = ELinkableIcon.Telegram.toLowerCase();
        this.title = title ? title : ELinkableIcon.Telegram;
        this.href = 'https://t.me/CryptoShalixES';
        this.path = this.setSVGComponent(IMAGES.Telegram);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Youtube:
        this.id = ELinkableIcon.Youtube.toLowerCase();
        this.title = title ? title : ELinkableIcon.Youtube;
        this.href = 'https://www.youtube.com/channel/UCde7n5s8Ed1OAlq46k_MBVA';
        this.path = this.setSVGComponent(IMAGES.Youtube);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      default:
        this.id = id.toLowerCase();
        this.title = title ? title : '';
        this.path = path ? path : '';
        this.href = href ? href : '';
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = color ? color : '';
        break;
    }
    this.showText = showText;
    this.label = this.title;
    this.target = target ? target : ELinkableTarget.BLANK;
  }

  private setSVGComponent(path: string): string {
    return `
    <svg class="svgControl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <path class="svgPath" d="${path}"></path>
    </svg>`;
  }
}
