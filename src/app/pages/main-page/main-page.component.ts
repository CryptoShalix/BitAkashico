import { Component, OnInit } from '@angular/core';
import { ELinkableIconType, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  iconListMenu: LinkableIcon[];

  constructor() { }

  ngOnInit(): void {
    this.prepareIconListMenu();
  }

  private prepareIconListMenu(): void {
    this.iconListMenu = [];
    // this.iconListMenu.push(this.createMenuIcon('/', 'accountBalance', 'account balance'));
  }

  private createMenuIcon(href: string, text: string, icon: string): LinkableIcon {
    const textTranslated = text; // this.translate.instant(text);
    return new LinkableIcon(textTranslated,
      {
        href,
        path: icon,
        target: '_self',
        title: textTranslated,
        showText: true,
        isCard: true,
        type: ELinkableIconType.ICON,
      },
    );
  }
}
