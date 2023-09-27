import { Component, OnInit } from '@angular/core';

import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';
import { ITestimonial } from 'src/app/shared/models/core';

@Component({
  selector: 'app-academy-page',
  templateUrl: './academy-page.component.html',
  styleUrls: ['./academy-page.component.scss']
})
export class AcademyPageComponent implements OnInit {
  private _translateRoot = 'PAGES.ACADEMY.';
  IS_BIT_SIDE = false;
  TITLE_LOGO = '';
  TITLE_TEXT = '';

  testimonials: ITestimonial[] = [];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this.TITLE_LOGO = this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO;
    this.TITLE_TEXT = this.IS_BIT_SIDE ? 'BIT-ACADEMY' : 'AKA-DEMY';
    // this.getTestimonials();
  }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }

  getAboutTextBySide() {
    return this._translateRoot + (this.IS_BIT_SIDE ? 'BIT.about' : 'AKASHICO.about');
  }

  getAkademyText() {
    return this._translateRoot + 'AKASHICO.akademy';
  }

  getAkademyTestimonialsText() {
    return this._translateRoot + 'AKASHICO.testimonials';
  }

  private getTestimonials() {
    this.testimonials = [
      { name: 'STRINGS.anonymous', text: '' }
    ];
  }
}
