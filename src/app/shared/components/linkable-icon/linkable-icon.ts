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

export enum ELinkableIconSVG {
  // Twitter: https://friconix.com/icon/fi-xnsuxl-twitter-solid/?sid=342104&iid=2859
  Twitter = 'M 342 828C 252 828 163 802 88 754C 175 764 265 739 333 685C 266 685 203 640 181 577C 188 566 232 579 253 568C 178 554 119 482 121 406C 140 412 170 426 196 424C 124 379 100 276 144 204C 227 306 354 371 485 376C 474 330 484 278 513 240C 564 169 672 152 741 204C 774 247 827 205 865 189C 873 206 830 262 799 277C 829 274 859 266 888 254C 886 271 839 317 811 337C 816 452 777 568 705 658C 619 768 480 830 342 828',
  // Discord: https://friconix.com/icon/fi-xnsuxl-discord-alt/
  Discord = 'M 386 203C 387 203 388 203 388 203C 388 203 395 212 395 212C 267 248 209 304 209 304C 209 304 224 296 250 284C 326 250 386 241 411 239C 415 238 419 238 423 238C 466 232 515 231 566 236C 633 244 705 264 779 304C 779 304 723 251 603 214C 603 214 612 203 612 203C 612 203 709 201 811 277C 811 277 913 462 913 689C 913 689 853 792 697 797C 697 797 671 767 650 740C 743 714 778 656 778 656C 749 675 721 688 697 697C 661 712 627 722 594 728C 526 740 464 737 411 727C 371 719 336 708 307 697C 291 690 273 682 255 673C 253 671 251 670 249 669C 248 668 247 668 246 667C 233 660 226 655 226 655C 226 655 260 711 350 738C 329 765 303 797 303 797C 146 792 87 689 87 689C 87 462 189 277 189 277C 284 206 375 203 386 203C 386 203 386 203 386 203M 368 467C 327 467 296 502 296 545C 296 588 328 624 368 624C 408 624 440 588 440 545C 441 502 408 467 368 467C 368 467 368 467 368 467M 626 467C 586 467 554 502 554 545C 554 588 586 624 626 624C 666 624 698 588 698 545C 698 502 666 467 626 467C 626 467 626 467 626 467',
  // Telegram: https://friconix.com/icon/fi-xnsuxl-telegram/?sid=342413&iid=21250
  Telegram = 'M 185 525C 185 525 185 525 185 525C 244 492 309 465 370 438C 476 394 581 350 688 309C 709 302 746 296 750 326C 748 370 740 413 734 457C 720 552 703 647 687 742C 681 774 642 790 616 770C 555 729 494 688 434 646C 414 626 432 597 450 583C 500 533 553 491 601 439C 614 408 576 434 563 442C 495 490 428 540 355 581C 318 602 275 584 238 573C 205 559 156 546 185 525C 185 525 185 525 185 525',
  // Youtube: https://friconix.com/icon/fi-xwsuxl-youtube/?sid=363118&iid=5543
  Youtube = 'M 500 275C 500 275 500 275 500 275C 500 275 703 275 754 288C 781 296 803 318 811 346C 825 396 824 502 824 502C 824 502 824 607 811 658C 803 686 781 707 754 715C 703 728 500 728 500 728C 500 728 298 728 246 714C 219 707 197 685 189 657C 176 607 176 501 176 501C 176 501 176 396 189 346C 197 318 219 295 246 288C 297 275 500 275 500 275M 435 404C 435 404 435 404 435 404C 435 404 435 599 435 599C 435 599 604 501 604 501C 604 501 435 404 435 404',
  Academy = 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
  GreaterThan = 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  Distinct = 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  Flame = 'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z',
  Rocket = 'M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z',
}

export enum ELinkableTarget {
  SELF = '_self',
  BLANK = '_blank',
}

export interface ILinkableIcon {
  title: string;
  href: string;
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
        this.path = 'assets/images/logo_square.png';
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = false;
        this.isImage = true;
        target = ELinkableTarget.SELF;
        showText = true;
        break;
      case ELinkableIcon.Twitter:
        this.id = ELinkableIcon.Twitter.toLowerCase();
        this.title = title ? title : ELinkableIcon.Twitter;
        this.href = href ? href : 'https://twitter.com/CryptoShalix';
        this.path = this.setSVGComponent(ELinkableIconSVG.Twitter);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = color ? color : '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Discord:
        this.id = ELinkableIcon.Discord.toLowerCase();
        this.title = title ? title : ELinkableIcon.Discord;
        this.href = 'https://discord.gg/9QQhZhn3Gc';
        this.path = this.setSVGComponent(ELinkableIconSVG.Discord);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Telegram:
        this.id = ELinkableIcon.Telegram.toLowerCase();
        this.title = title ? title : ELinkableIcon.Telegram;
        this.href = 'https://t.me/CryptoShalixES';
        this.path = this.setSVGComponent(ELinkableIconSVG.Telegram);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        this.isImage = true;
        break;
      case ELinkableIcon.Youtube:
        this.id = ELinkableIcon.Youtube.toLowerCase();
        this.title = title ? title : ELinkableIcon.Youtube;
        this.href = 'https://www.youtube.com/channel/UCde7n5s8Ed1OAlq46k_MBVA';
        this.path = this.setSVGComponent(ELinkableIconSVG.Youtube);
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
