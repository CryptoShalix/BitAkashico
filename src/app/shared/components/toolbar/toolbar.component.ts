import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { TranslateService } from '../../services/translate.service';

import { IMAGES } from 'src/assets/images/images';
import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from '../linkable-icon/linkable-icon';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  @Input() set sIsBitSite(_isBitSite: boolean) {
    this.IS_BIT_SITE = _isBitSite;
    this.prepareMenu();
  }

  IS_BIT_SITE = false;
  IMAGE_LOGO = IMAGES.HOME_IMG_SMALL;
  title = ELinkableIcon.Home;

  showContainerDonations = false;
  showMenu = false;

  iconListMenu: LinkableIcon[] = [];

  icmIdAcademy = 'academy';
  icmIdTools = 'tools';
  icmIdCalc = 'calc';
  icmIdHome = 'home';
  icmIdBooks = 'books';
  icmIdTestimonials = 'testimonials';
  icmIdGames = 'games';
  icmIdContact = 'contact';

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private storageService: StorageService,
  ) { }

  private prepareMenu(): void {
    this.iconListMenu = [];

    this.addMenuItem(ELinkableIcon.Home);
    this.addMenuItem(this.icmIdContact, 'alternate_email');
    this.addMenuItem(this.icmIdAcademy, 'school');
    this.addMenuItem(this.icmIdBooks, 'menu_book');
    this.addMenuItem(this.icmIdTestimonials, 'format_quote');

    if (this.IS_BIT_SITE) {
      this.addMenuItem(this.icmIdTools, 'construction');
      this.addMenuItem(this.icmIdGames, 'sports_esports');
      //this.addMenuItem(this.icmIdCalc,'assessment');
    }
  }

  private addMenuItem(linkId: string, linkIcon: string = '') {
    let _linkableIcon: LinkableIcon;
    if (linkIcon === '') {
      _linkableIcon = new LinkableIcon(ELinkableIcon.Home, {
        title: 'MENU.home',
        showText: true,
        isMenu: true
      });
    } else {
      _linkableIcon = new LinkableIcon(linkId, {
        href: linkId,
        title: 'MENU.' + linkId,
        iconPath: linkIcon,
        color: '#fff',
        type: ELinkableIconType.ICON,
        target: ELinkableTarget.SELF,
        showText: true,
        isMenu: true
      });
    }
    this.iconListMenu.push(_linkableIcon);
  }

  onToggleSide() {
    const _appSide = this.storageService.isAppSideBit();
    this.storageService.setAppSide(_appSide ? 2 : 1);
    this.showMenu = false;
  }

  onChangeLanguage(): void {
    this.translateService.toggleUserLanguage();
    location.reload();
  }

  getTooltipLanguage(): string {
    return `LANGUAGE.${this.translateService.userLang}`;
  }

  getCurrentPage() {
    const path = this.router.url.replace('/', '').toLowerCase();
    return `MENU.${path === '' ? 'home' : path}`;
  }
}