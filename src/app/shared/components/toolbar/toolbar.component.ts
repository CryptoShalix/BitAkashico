import { Component } from '@angular/core';

import { IMAGES } from 'src/assets/images/images';
import { TranslateService } from '../../services/translate.service';
import { ELinkableIcon } from '../linkable-icon/linkable-icon';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  IS_BIT_SITE = false;
  IMAGE_LOGO = IMAGES.HOME_IMG;
  title = ELinkableIcon.Home;

  showContainerDonations = false;
  showMenu = false;
  showMenuAsLogo = true;

  constructor(
    private translateService: TranslateService,
  ) { }

  onChangeLanguage(): void {
    this.translateService.toggleUserLanguage();
    location.reload();
  }

  getTooltipLanguage(): string {
    return `LANGUAGE.${this.translateService.userLang}`;
  }
}