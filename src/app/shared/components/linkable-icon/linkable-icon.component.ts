import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { LinkableIcon } from './linkable-icon';

@Component({
  selector: 'app-linkable-icon',
  templateUrl: './linkable-icon.component.html',
})
export class LinkableIconComponent {
  defaultIcon: LinkableIcon;
  svgPath: string;

  @Input() set sDefaultIcon(defaultIcon: LinkableIcon) {
    this.defaultIcon = defaultIcon;
    this.createSVG();
  }

  constructor(
    private coreService: CoreService,
  ) { }

  private createSVG(): void {
    if (this.defaultIcon && this.defaultIcon.isSVG) {
      if (!this.coreService.isNullOrEmpty(this.defaultIcon.iconPath)) {
        this.svgPath = this.defaultIcon.iconPath;
      }
    }
  }

  isCurrentPage(href: string): boolean {
    const currentFullPage = window.location.hash;
    return currentFullPage.includes(`/${href}`);
  }
}
