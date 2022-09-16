import { Component, Input } from '@angular/core';

import { IMAGES } from '../../../../assets/images/images';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html'
})
export class CustomImageComponent {
  @Input() set sClass(imageClass: string) {
    this.imgClass = imageClass;
  }
  @Input() set sImgSRC(src: string | undefined) {
    this.imgSRC = this.coreService.isNullOrEmpty(src) ? this.imgSRCError : src;
  }

  imgClass: string;
  imgSRC: string | undefined;
  imgSRCError: string = IMAGES.NO_IMAGE;

  constructor(private coreService: CoreService) { }
}
