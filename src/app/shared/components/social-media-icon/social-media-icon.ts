export enum ESocialMediaIcon {
  Twitter = 'Twitter',
  Discord = 'Discord',
  Telegram = 'Telegram',
}

export class SocialMediaIcon {
  // Discord: https://friconix.com/icon/fi-xnsuxl-discord-alt/
  // Twitter: https://friconix.com/icon/fi-xnsuxl-twitter-solid/?sid=342104&iid=2859

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
    id: string | ESocialMediaIcon,
    title?: string, path?: string, href?: string, isSVG: boolean = false, color?: string
  ) {
    switch (id) {
      case ESocialMediaIcon.Twitter:
        this.id = ESocialMediaIcon.Twitter.toLowerCase();
        this.title = ESocialMediaIcon.Twitter;
        this.href = 'https://twitter.com/adlrg1991';
        this.path = 'M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23';
        // this.path = '../../../../assets/images/Logo. Twitter.svg';
        this.tooltip = this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        break;
      case ESocialMediaIcon.Discord:
        this.id = ESocialMediaIcon.Discord.toLowerCase();
        this.title = ESocialMediaIcon.Discord;
        this.href = 'https://discord.gg/9QQhZhn3Gc';
        this.path = 'M 386 203C 387 203 388 203 388 203C 388 203 395 212 395 212C 267 248 209 304 209 304C 209 304 224 296 250 284C 326 250 386 241 411 239C 415 238 419 238 423 238C 466 232 515 231 566 236C 633 244 705 264 779 304C 779 304 723 251 603 214C 603 214 612 203 612 203C 612 203 709 201 811 277C 811 277 913 462 913 689C 913 689 853 792 697 797C 697 797 671 767 650 740C 743 714 778 656 778 656C 749 675 721 688 697 697C 661 712 627 722 594 728C 526 740 464 737 411 727C 371 719 336 708 307 697C 291 690 273 682 255 673C 253 671 251 670 249 669C 248 668 247 668 246 667C 233 660 226 655 226 655C 226 655 260 711 350 738C 329 765 303 797 303 797C 146 792 87 689 87 689C 87 462 189 277 189 277C 284 206 375 203 386 203C 386 203 386 203 386 203M 368 467C 327 467 296 502 296 545C 296 588 328 624 368 624C 408 624 440 588 440 545C 441 502 408 467 368 467C 368 467 368 467 368 467M 626 467C 586 467 554 502 554 545C 554 588 586 624 626 624C 666 624 698 588 698 545C 698 502 666 467 626 467C 626 467 626 467 626 467';
        // this.path = '../../../../assets/images/Logo. Discord.svg';
        this.tooltip = this.title;
        this.color = '#ffffff';
        this.isSVG = true;
        break;
      default:
        this.id = id.toLowerCase();
        this.title = title ? title : '';
        this.path = path ? path : '';
        this.href = href ? href : '';
        this.tooltip = this.title;
        this.color = color ? color : '';
        this.isSVG = isSVG;
        break;
    }
    this.label = this.title;
    this.target = '_blank';
  }
}
