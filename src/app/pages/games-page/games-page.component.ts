import { Component, OnInit } from '@angular/core';

import { ICardGame } from 'src/app/shared/components/linkable-icon/linkable-icon';
import { IMAGES } from 'src/assets/images/images';

import { CoreService } from '../../shared/services/core.service';

import { IAccordion, IAccordionItem, URLS } from 'src/app/shared/models/core';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss']
})
export class GamesPageComponent implements OnInit {
  gamesList: ICardGame[] = [];
  walletsList: IAccordion[] = [];

  imgAppStoreApple = IMAGES.APP_STORE_APPLE;
  imgAppStoreGoogle = IMAGES.APP_STORE_GOOGLE;

  stringsPrefix = 'PAGES.GAMES.';

  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.prepareGames();
    this.prepareWallets();
  }

  private prepareGames(): void {
    this.gamesList = [];

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_SATSSS_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_SATSSS_SMALL,
      name: 'gameSatsssName',
      title: 'gameSatsssTitle',
      description: 'gameSatsssDescription',
      linkApple: 'https://apps.apple.com/us/app/satsss-bitcoin-snake/id1608309186',
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.snake'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_TURBO84_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_TURBO84_SMALL,
      name: 'gameTurbo84Name',
      title: 'gameTurbo84Title',
      description: 'gameTurbo84Description',
      linkApple: 'https://apps.apple.com/us/app/turbo-84-retro-joyride/id1447615877',
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.turbo84'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BOUNCE_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BOUNCE_SMALL,
      name: 'gameBounceName',
      title: 'gameBounceTitle',
      description: 'gameBounceDescription',
      linkApple: 'https://apps.apple.com/us/app/bitcoin-bounce/id1487339632',
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.bitcoinbounce'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BAY_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BAY_SMALL,
      name: 'gameBayName',
      title: 'gameBayTitle',
      description: 'gameBayDescription',
      linkApple: 'https://apps.apple.com/us/app/thndr-bay/id1586949384',
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.thndrbay'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_BITCOIN_MINER_LARGE,
      imgSmall: IMAGES.GAMES_BITCOIN_MINER_SMALL,
      name: 'gameBitcoinMinerName',
      title: 'gameBitcoinMinerTitle',
      description: 'gameBitcoinMinerDescription',
      linkApple: 'https://apps.apple.com/us/app/bitcoin-miner-idle-tycoon/id1413770650',
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.fumbgames.bitcoinminor'
    });
  }

  private prepareWallets(): void {
    this.walletsList = [];
    const accordion = this.coreService.prepareBitcoinWallets(true);
    this.walletsList.push(accordion);
  }
}
