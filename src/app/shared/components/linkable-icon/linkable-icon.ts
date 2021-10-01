export enum ELinkableIcon {
  Home = 'Home',
  Twitter = 'Twitter',
  Discord = 'Discord',
  Telegram = 'Telegram',
}

export enum ELinkableIconSVG {
  // Twitter: https://friconix.com/icon/fi-xnsuxl-twitter-solid/?sid=342104&iid=2859
  Twitter = 'M 342 828C 252 828 163 802 88 754C 175 764 265 739 333 685C 266 685 203 640 181 577C 188 566 232 579 253 568C 178 554 119 482 121 406C 140 412 170 426 196 424C 124 379 100 276 144 204C 227 306 354 371 485 376C 474 330 484 278 513 240C 564 169 672 152 741 204C 774 247 827 205 865 189C 873 206 830 262 799 277C 829 274 859 266 888 254C 886 271 839 317 811 337C 816 452 777 568 705 658C 619 768 480 830 342 828',
  // Discord: https://friconix.com/icon/fi-xnsuxl-discord-alt/
  Discord = 'M 386 203C 387 203 388 203 388 203C 388 203 395 212 395 212C 267 248 209 304 209 304C 209 304 224 296 250 284C 326 250 386 241 411 239C 415 238 419 238 423 238C 466 232 515 231 566 236C 633 244 705 264 779 304C 779 304 723 251 603 214C 603 214 612 203 612 203C 612 203 709 201 811 277C 811 277 913 462 913 689C 913 689 853 792 697 797C 697 797 671 767 650 740C 743 714 778 656 778 656C 749 675 721 688 697 697C 661 712 627 722 594 728C 526 740 464 737 411 727C 371 719 336 708 307 697C 291 690 273 682 255 673C 253 671 251 670 249 669C 248 668 247 668 246 667C 233 660 226 655 226 655C 226 655 260 711 350 738C 329 765 303 797 303 797C 146 792 87 689 87 689C 87 462 189 277 189 277C 284 206 375 203 386 203C 386 203 386 203 386 203M 368 467C 327 467 296 502 296 545C 296 588 328 624 368 624C 408 624 440 588 440 545C 441 502 408 467 368 467C 368 467 368 467 368 467M 626 467C 586 467 554 502 554 545C 554 588 586 624 626 624C 666 624 698 588 698 545C 698 502 666 467 626 467C 626 467 626 467 626 467',
  // Telegram: https://friconix.com/icon/fi-xnsuxl-telegram/?sid=342413&iid=21250
  Telegram = 'M 185 525C 185 525 185 525 185 525C 244 492 309 465 370 438C 476 394 581 350 688 309C 709 302 746 296 750 326C 748 370 740 413 734 457C 720 552 703 647 687 742C 681 774 642 790 616 770C 555 729 494 688 434 646C 414 626 432 597 450 583C 500 533 553 491 601 439C 614 408 576 434 563 442C 495 490 428 540 355 581C 318 602 275 584 238 573C 205 559 156 546 185 525C 185 525 185 525 185 525',
}

export interface ILinkableIcon {
  title?: string;
  href?: string;
  path?: string;
  isSVG?: boolean;
  tooltip?: string;
  color?: string;
  target?: string;
}

export class LinkableIcon {
  id: string;
  label: string;
  title: string;
  path: string;
  href: string;
  tooltip: string;
  color: string;
  isSVG: boolean;
  target: string;

  constructor(
    id: string | ELinkableIcon,
    linkableIcon?: ILinkableIcon
  ) {
    const title = linkableIcon?.title;
    const href = linkableIcon?.href;
    const tooltip = linkableIcon?.tooltip;
    const color = linkableIcon?.color;
    const path = linkableIcon?.path;
    const target = linkableIcon?.target;
    const isSVG = linkableIcon ? linkableIcon.isSVG : false;
    switch (id) {
      case ELinkableIcon.Home:
        this.id = title ? title : ELinkableIcon.Home.toLowerCase();
        this.title = title ? title : ELinkableIcon.Home;
        this.href = href ? href : '';
        // this.path = this.setSVGComponent(ELinkableIconSVG.Home);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        break;
      case ELinkableIcon.Twitter:
        this.id = ELinkableIcon.Twitter.toLowerCase();
        this.title = title ? title : ELinkableIcon.Twitter;
        this.href = href ? href : 'https://twitter.com/adlrg1991';
        this.path = this.setSVGComponent(ELinkableIconSVG.Twitter);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = color ? color : '#ffffff';
        this.isSVG = true;
        break;
      case ELinkableIcon.Discord:
        this.id = ELinkableIcon.Discord.toLowerCase();
        this.title = title ? title : ELinkableIcon.Discord;
        this.href = 'https://discord.gg/9QQhZhn3Gc';
        this.path = this.setSVGComponent(ELinkableIconSVG.Discord);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        break;
      case ELinkableIcon.Telegram:
        this.id = ELinkableIcon.Telegram.toLowerCase();
        this.title = title ? title : ELinkableIcon.Telegram;
        this.href = href ? href : '';
        this.path = this.setSVGComponent(ELinkableIconSVG.Telegram);
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        break;
      default:
        this.id = id.toLowerCase();
        this.title = title ? title : '';
        this.path = path ? path : '';
        this.href = href ? href : '';
        this.tooltip = tooltip ? tooltip : this.title;
        this.color = color ? color : '';
        this.isSVG = isSVG === undefined ? false : isSVG;
        break;
    }
    this.label = this.title;
    this.target = target ? target : '_blank';
  }

  private setSVGComponent(path: string): string {
    const htmlSVG = '<svg class="svgControl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">';
    const htmlPath = '<path class="svgPath" d="' + path + '"></path></svg>';
    return htmlSVG + htmlPath;
  }
}
