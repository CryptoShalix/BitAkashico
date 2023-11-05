import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { StorageService } from 'src/app/shared/services/storage.service';
import { DBService } from 'src/app/shared/services/db.service';

import {
  ELinkableIconType,
  ELinkableTarget,
  LinkableIcon
} from 'src/app/shared/components/linkable-icon/linkable-icon';
import { IAccordion } from 'src/app/shared/models/core';
import { ECurrency } from '../../shared/models/currency';

@Component({
  selector: 'app-tools-page',
  templateUrl: './tools-page.component.html',
  styleUrls: ['./tools-page.component.scss']
})
export class ToolsPageComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  TITLE_TEXT = 'MENU.tools';
  showExpanded = false;
  bitcoinText = ECurrency.BTC.text;

  toolsList: IAccordion[] = [];
  customToolsList: LinkableIcon[] = [];

  private ctlCalculator = 'ctlCalculator';
  private ctlWhenToSell = 'ctlWhenToSell';
  private ctlBenefits = 'ctlBenefits';

  constructor(
    private storageService: StorageService,
    private dbService: DBService
  ) { }

  ngOnInit(): void {
    this.storageService.setAppSide(1);
    this.storageService.appSide$.subscribe(() => {
      this.prepareToolsList();
      // this.prepareCustomTools();
      if (this.accordion) { this.accordion.openAll(); }
    });
  }

  private async prepareToolsList() {
    this.toolsList = await this.dbService.getAppList();
  }

  private prepareCustomTools(): void {
    this.customToolsList = [];
    this.customToolsList.push(new LinkableIcon(this.ctlCalculator, {
      // href: 'calculator',
      title: 'PAGES.TOOLS.CUSTOM.calculator',
      tooltip: 'PAGES.TOOLS.CUSTOM.calculatorTooltip',
      iconPath: 'dialpad',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
      isCard: true
    }));
    this.customToolsList.push(new LinkableIcon(this.ctlWhenToSell, {
      // href: 'when-to-sell',
      title: 'PAGES.TOOLS.CUSTOM.whenToSell',
      tooltip: 'PAGES.TOOLS.CUSTOM.whenToSellTooltip',
      iconPath: 'score',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
      isCard: true
    }));
    this.customToolsList.push(new LinkableIcon(this.ctlBenefits, {
      // href: 'calculator-benefits',
      title: 'PAGES.TOOLS.CUSTOM.benefits',
      tooltip: 'PAGES.TOOLS.CUSTOM.benefitsTooltip',
      iconPath: 'poll',
      color: '#fff',
      type: ELinkableIconType.ICON,
      target: ELinkableTarget.SELF,
      showText: true,
      isCard: true
    }));
  }
}
