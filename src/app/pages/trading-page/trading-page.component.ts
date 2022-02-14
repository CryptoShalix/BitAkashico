import { Component, OnInit } from '@angular/core';
import { ELinkableIcon, LinkableIcon } from 'src/app/shared/components/linkable-icon/linkable-icon';

@Component({
  selector: 'app-trading-page',
  templateUrl: './trading-page.component.html',
  styleUrls: ['./trading-page.component.scss']
})
export class TradingPageComponent implements OnInit {
  iconListMedia: LinkableIcon[];

  constructor() { }

  ngOnInit(): void {
  }
}
