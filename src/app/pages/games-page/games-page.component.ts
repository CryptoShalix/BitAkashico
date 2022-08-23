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
      linkMain: URLS.REF_GAME_SNAKE,
      linkApple: URLS.REF_GAME_IOS_SNAKE,
      linkGoogle: URLS.REF_GAME_AND_SNAKE
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_TURBO84_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_TURBO84_SMALL,
      name: 'gameTurbo84Name',
      title: 'gameTurbo84Title',
      description: 'gameTurbo84Description',
      linkMain: URLS.REF_GAME_TURBO84,
      linkApple: URLS.REF_GAME_IOS_TURBO84,
      linkGoogle: URLS.REF_GAME_AND_TURBO84
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BOUNCE_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BOUNCE_SMALL,
      name: 'gameBounceName',
      title: 'gameBounceTitle',
      description: 'gameBounceDescription',
      linkMain: URLS.REF_GAME_BOUNCE,
      linkApple: URLS.REF_GAME_IOS_BOUNCE,
      linkGoogle: URLS.REF_GAME_AND_BOUNCE
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_THNDR_BAY_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_BAY_SMALL,
      name: 'gameBayName',
      title: 'gameBayTitle',
      description: 'gameBayDescription',
      linkMain: URLS.REF_GAME_BAY,
      linkApple: URLS.REF_GAME_IOS_BAY,
      linkGoogle: URLS.REF_GAME_AND_BAY
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_BITCOIN_MINER_LARGE,
      imgSmall: IMAGES.GAMES_BITCOIN_MINER_SMALL,
      name: 'gameBitcoinMinerName',
      title: 'gameBitcoinMinerTitle',
      description: 'gameBitcoinMinerDescription',
      linkApple: URLS.REF_GAME_IOS_MINER,
      linkGoogle: URLS.REF_GAME_AND_MINER
    });
  }

  private prepareWallets(): void {
    this.walletsList = [];
    const accordion = this.coreService.prepareBitcoinWallets(true);
    this.walletsList.push(accordion);
  }
}
