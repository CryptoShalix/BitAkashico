import { Component, Input } from '@angular/core';

import { CoreService } from '../../services/core.service';

import { Router } from '@angular/router';
import { ELinkableTarget, LinkableIcon } from './linkable-icon';

@Component({
  selector: 'app-linkable-icon',
  templateUrl: './linkable-icon.component.html',
})
export class LinkableIconComponent {
  defaultIcon: LinkableIcon;
  svgPath: string;
  _isRouterLink: boolean = false;
  _disabled: boolean = false;

  @Input() set sDefaultIcon(defaultIcon: LinkableIcon) {
    this.defaultIcon = defaultIcon;
    this._isRouterLink = this.defaultIcon.target !== ELinkableTarget.BLANK;
    this.createSVG();
  }

  @Input() set sDisabled(disabled: boolean) {
    this._disabled = disabled;
  }

  constructor(
    private router: Router,
    private coreService: CoreService,
  ) { }

  private createSVG(): void {
    if (this.defaultIcon && this.defaultIcon.isSVG) {
      if (!this.coreService.isNullOrEmpty(this.defaultIcon.iconPath)) {
        this.svgPath = this.defaultIcon.iconPath;
      }
    }
  }

  getURL() {
    return this._disabled ? null : this.defaultIcon.href;
  }

  getTooltip() {
    return this.isNullOrEmpty(this.defaultIcon.tooltip) ? this.defaultIcon.title : this.defaultIcon.tooltip;
  }

  isCurrentPage(href: string): boolean {
    let path = this.router.url.replace('/', '').toLowerCase();
    if (this.isNullOrEmpty(path)) { path = 'home'; }
    return path.includes(href);
  }

  isNullOrEmpty(text: string) {
    return this.coreService.isNullOrEmpty(text);
  }
}
