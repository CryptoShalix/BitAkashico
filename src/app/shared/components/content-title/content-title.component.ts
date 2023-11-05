import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { IMAGES } from 'src/assets/images/images';

@Component({
  selector: 'app-content-title',
  templateUrl: './content-title.component.html'
})
export class ContentTitleComponent {
  @Input() set setTitle(_title: string) {
    this.TITLE_TEXT = _title;
    this.initialize();
  }

  IS_BIT_SIDE = false;
  TITLE_LOGO = '';
  TITLE_TEXT = 'BIT-AKASHICO';

  constructor(
    private coreService: CoreService,
  ) { }

  private initialize() {
    this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    this.TITLE_LOGO = this.IS_BIT_SIDE ? '₿' : IMAGES.LOGO_AKASHICO;
  }
}