import { Component, OnInit } from '@angular/core';

import { CoreService } from '../../shared/services/core.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent implements OnInit {
  private IS_BIT_SIDE = true;

  constructor(
    private coreService: CoreService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(() => {
      this.IS_BIT_SIDE = this.coreService.isAppSidebit();
    });
  }

  getAboutText() {
    return this.IS_BIT_SIDE ? 'PAGES.CONTACT.aboutBit' : 'PAGES.CONTACT.aboutAka';
  }
}
