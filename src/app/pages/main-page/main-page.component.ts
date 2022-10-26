import { Component, OnInit } from '@angular/core';
import { ELinkableIcon, ELinkableIconType, ELinkableTarget, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';
import { URLS } from '../../shared/models/core';
import { IMAGES } from '../../../assets/images/images';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  iconListMedia: LinkableIcon[];
  iconListTopApps: LinkableIcon[];

  constructor() { }

  ngOnInit(): void {
    this.prepareIconListMedia();
    this.prepareIconListTopApps();
  }

  private prepareIconListMedia(): void {
    this.iconListMedia = [];
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Twitter));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Discord));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Telegram));
    this.iconListMedia.push(new LinkableIcon(ELinkableIcon.Youtube));
  }

  private prepareIconListTopApps(): void {
    this.iconListTopApps = [];
    this.iconListTopApps.push(new LinkableIcon('TopApp1', {
      href: URLS.REF_Sennet,
      title: 'Sennet',
      tooltip: 'PAGES.TOOLS.GROUPS.ANALYSIS_MARKET.appSennet',
      iconPath: IMAGES.LOGO_SENNET,
      color: '#fff',
      type: ELinkableIconType.IMAGE,
      target: ELinkableTarget.BLANK,
      showText: false,
      isCard: true
    }));
    this.iconListTopApps.push(new LinkableIcon('TopApp2', {
      href: URLS.REF_Slice,
      title: 'Slice',
      tooltip: 'PAGES.TOOLS.GROUPS.OTHERS.appSlice',
      iconPath: IMAGES.LOGO_SLICE,
      color: '#fff',
      type: ELinkableIconType.IMAGE,
      target: ELinkableTarget.BLANK,
      showText: false,
      isCard: true
    }));
  }
}
