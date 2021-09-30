import { Component, ElementRef, Input, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { CoreService } from '../../services/core.service';

import { SocialMediaIcon } from './social-media-icon';

@Component({
  selector: 'app-social-media-icon',
  templateUrl: './social-media-icon.component.html',
  styleUrls: ['./social-media-icon.component.scss'],
})
export class SocialMediaIconComponent {
  @ViewChild('svg', { static: false }) svg: ElementRef;
  // svg: SafeHtml;
  defaultIcon: SocialMediaIcon;

  @Input() set sDefaultIcon(defaultIcon: SocialMediaIcon) {
    this.defaultIcon = defaultIcon;
    this.createSVG();
  }

  constructor(
    private coreService: CoreService,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {
  }

  private createSVG(): void {
    if (this.defaultIcon && this.defaultIcon.isSVG) {
      console.log(this.defaultIcon.path);
      if (!this.coreService.isNullOrEmpty(this.defaultIcon.path)) {
        // this.svg = this.sanitizer.bypassSecurityTrustHtml(this.defaultIcon.path);
        console.log(this.svg);
        const pathElement = this.renderer.createElement('path', 'svg');
        this.renderer.setAttribute(pathElement, 'd', this.defaultIcon.path);
        this.renderer.setAttribute(pathElement, 'style', 'fill:' + this.defaultIcon.color + ';');
        this.renderer.appendChild(this.svg.nativeElement, pathElement);
      }
    }
  }

}
