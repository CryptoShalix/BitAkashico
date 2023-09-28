import { Component, Input } from '@angular/core';

import { ELinkableIcon, LinkableIcon } from '../linkable-icon/linkable-icon';

@Component({
  selector: 'app-linkable-icon-container',
  templateUrl: './linkable-icon-container.component.html'
})
export class LinkableIconContainerComponent {
  @Input() set setTitle(title: string) {
    this._title = title;
  }
  @Input() set setList(list: LinkableIcon[]) {
    this._list = list;
  }

  _title: string = '';
  _list: LinkableIcon[] = [];

  constructor(
  ) { this.prepareIconListMedia(); }

  private prepareIconListMedia(): void {
    this._list = [];
    this._list.push(new LinkableIcon(ELinkableIcon.Discord));
    this._list.push(new LinkableIcon(ELinkableIcon.Telegram));
    this._list.push(new LinkableIcon(ELinkableIcon.Youtube));
  }

  hasTitle() { return this._title !== ''; }
}