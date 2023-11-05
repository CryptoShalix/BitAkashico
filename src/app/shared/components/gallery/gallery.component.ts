import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { IGalleryItem } from './gallery.model';

import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  @Input() set setList(_galleryList: IGalleryItem[]) {
    this.GALLERY_LIST = _galleryList;
  }

  GALLERY_LIST: IGalleryItem[] = [];

  ICON_AMAZON = IMAGES.Amazon;

  constructor(
    private coreService: CoreService
  ) { }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }
}