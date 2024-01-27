import { Component, OnInit } from '@angular/core';

import { CoreService } from './shared/services/core.service';
import { StorageService } from './shared/services/storage.service';

import { ECurrency } from './shared/models/currency';

// Angular Material Icons: https://fonts.google.com/icons
// Angular translate: https://medium.com/angular-chile/aplicaciones-multilenguaje-en-angular-7-con-ngx-translate-db8d1e7b380c
// Lightning widget (donations): https://github.com/reneaaron/lightning-widget

/**
 * To publish this app on Github Pages
 * Source: https://medium.com/tech-insights/how-to-deploy-angular-apps-to-github-pages-gh-pages-896c4e10f9b4
 *
 * 1. Install: npm i angular-cli-ghpages - save-dev
 * 2. ng build --configuration production --base-href "https://cryptoshalix.github.io/BitAkashico/"
 * 3. ngh -d dist/CryptoShalix || npx angular-cli-ghpages - dir=dist/CryptoShalix
 *
 * Sum up: ng build --configuration production --base-href "https://cryptoshalix.github.io/BitAkashico/" && ngh -d dist/CryptoShalix
 *
 * OR
 * 1. npm run publish-generate
 * 2. npm run publish-upload
 * 3. npm run deploy (this one launches both generate and upload same time)
 * (this one launches a package.json script. Check it out to update any details)
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  APP_SIDE: number;
  IS_BIT_SITE = false;
  currency = ECurrency.EUR;

  constructor(
    private coreService: CoreService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.storageService.appSide$.subscribe(appSide => {
      this.APP_SIDE = appSide;
      this.prepareAppSide();
    });
  }

  private prepareAppSide() {
    if (this.storageService.hasAppSide()) {
      this.IS_BIT_SITE = this.APP_SIDE === 1;
      this.prepareData();
    }
  }

  private prepareData(): void {
    this.coreService.setDefaultCurrency(this.currency);
  }
}
