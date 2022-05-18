import { Component, Input, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

import { CoreService } from '../../services/core.service';

import { IAccordion } from '../../models/core';
import { ECurrency } from '../../models/currency';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  @Input() showExpanded = false;
  @Input() set setAccordionList(list: IAccordion[]) {
    this.accordionList = list;
  }

  accordionList: IAccordion[] = [];
  bitcoinText = ECurrency.BTC.text;

  constructor(
    private coreService: CoreService,
  ) { }

  isNullOrEmpty(text: string): boolean {
    return this.coreService.isNullOrEmpty(text);
  }
}
