import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { IGalleryItem, IGalleryTitle, IGalleryTitleType } from './gallery.model';

import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  @Input() set setTitle(_galleryTitle: IGalleryTitle) {
    this.TITLE_LOGO = _galleryTitle.titleLogo;
    this.TITLE_TEXT = _galleryTitle.titleText;
    this.TITLE_TYPE_IMG = _galleryTitle.type === IGalleryTitleType.IMG;
    this.TITLE_BACK_DARK = _galleryTitle.backgroundDark;
  }

  @Input() set setList(_galleryList: IGalleryItem[]) {
    this.GALLERY_LIST = _galleryList;
  }

  TITLE_LOGO = '';
  TITLE_TEXT = '';
  TITLE_TYPE_IMG = false;
  TITLE_BACK_DARK = false;

  GALLERY_LIST: IGalleryItem[] = [];

  ICON_AMAZON = IMAGES.Amazon;

  constructor(
    private coreService: CoreService
  ) { }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }
}