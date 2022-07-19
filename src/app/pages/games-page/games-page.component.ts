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
      // linkApple: 'https://apps.apple.com/us/app/satsss-bitcoin-snake/id1608309186',
      linkApple: 'https://apps.apple.com/us/app/id1608309186?mt=8&referrer=singular_click_id%3Db67a6ef5-5a14-4b0d-8095-00cb8a1164c1',
      // linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.snake'
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.snake&referrer=singular_click_id%3Dbbc16a39-c3b7-4d3f-ae77-03e6f23faade'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_TURBO84_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_TURBO84_SMALL,
      name: 'gameTurbo84Name',
      title: 'gameTurbo84Title',
      description: 'gameTurbo84Description',
      // linkApple: 'https://apps.apple.com/us/app/turbo-84-retro-joyride/id1447615877',
      linkApple: 'https://apps.apple.com/pl/app/turbo-84-retro-joyride/id1447615877?referrer=singular_click_id%3Dd4876f7b-8d0b-403e-975f-ebe75a3375e2',
      // linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.turbo84'
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.turbo84&referrer=singular_click_id%3Dc9f8d30f-c84c-4948-b01e-808c673b6995'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BOUNCE_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BOUNCE_SMALL,
      name: 'gameBounceName',
      title: 'gameBounceTitle',
      description: 'gameBounceDescription',
      // linkApple: 'https://apps.apple.com/us/app/bitcoin-bounce/id1487339632',
      linkApple: 'https://apps.apple.com/pl/app/bitcoin-bounce/id1487339632?referrer=singular_click_id%3Dadebe79f-d749-49ea-9832-4e1cc4f20782',
      // linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.bitcoinbounce'
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.bitcoinbounce&referrer=singular_click_id%3De0e6b5c0-901d-404e-9589-7937072dd5d6'
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BAY_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BAY_SMALL,
      name: 'gameBayName',
      title: 'gameBayTitle',
      description: 'gameBayDescription',
      // linkApple: 'https://apps.apple.com/us/app/thndr-bay/id1586949384',
      linkApple: 'https://apps.apple.com/us/app/thndr-bay/id1586949384?referrer=singular_click_id%3De7f669bf-0266-42ff-bbc0-aa81683ab5ab',
      // linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.thndrbay'
      linkGoogle: 'https://play.google.com/store/apps/details?id=com.thndrgames.thndrbay&referrer=singular_click_id%3D458e1cb6-df0b-4fb3-bceb-49ae4c4a884c'
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
