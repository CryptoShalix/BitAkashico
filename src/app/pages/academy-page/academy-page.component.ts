import { Component, OnInit } from '@angular/core';

import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';

@Component({
  selector: 'app-academy-page',
  templateUrl: './academy-page.component.html',
  styleUrls: ['./academy-page.component.scss']
})
export class AcademyPageComponent implements OnInit {
  IS_BIT_SIDE = false;
  TITLE_LOGO = '';
  TITLE_TEXT = '';

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this.TITLE_LOGO = this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO;
    this.TITLE_TEXT = this.IS_BIT_SIDE ? 'BIT-ACADEMY' : 'AKA-DEMY';
  }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }

  getAboutTextBySide() {
    return this.IS_BIT_SIDE ? 'PAGES.ACADEMY.BIT.about' : 'PAGES.ACADEMY.AKASHICO.about';
  }

  getVideoUrl(source: any) {
    if (this.coreService.isNullOrEmpty(source)) { return 'https://www.youtube.com/@BitAkashico'; }
    return 'https://www.youtube.com/embed/videoseries?list=' + source;
  }
}
