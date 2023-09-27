import { Component, OnInit } from '@angular/core';

import { ICardGame } from 'src/app/shared/components/linkable-icon/linkable-icon';
import { IMAGES } from 'src/assets/images/images';

import { DBService } from 'src/app/shared/services/db.service';

import { Platform } from '@angular/cdk/platform';
import { IAccordion, URLS } from 'src/app/shared/models/core';

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

  noImage = IMAGES.NO_IMAGE;

  constructor(
    private dbService: DBService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.prepareGames();
    this.prepareWallets();
  }

  private prepareGames(): void {
    const linkBitcoinMinerGame = this.platform.ANDROID ? URLS.REF_GAME_AND_MINER : this.platform.IOS ? URLS.REF_GAME_IOS_MINER : URLS.REF_GAME_MINER;
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
      imgLarge: IMAGES.GAMES_THNDR_SOLITAIRE_LARGE,
      imgSmall: IMAGES.GAMES_THNDR_SOLITAIRE_SMALL,
      name: 'gameSolitaireName',
      title: 'gameSolitaireTitle',
      description: 'gameSolitaireDescription',
      linkMain: URLS.REF_GAME_SOLITAIRE,
      linkApple: URLS.REF_GAME_IOS_SOLITAIRE,
      linkGoogle: URLS.REF_GAME_AND_SOLITAIRE
    });

    this.gamesList.push({
      imgLarge: IMAGES.GAMES_BITCOIN_MINER_LARGE,
      imgSmall: IMAGES.GAMES_BITCOIN_MINER_SMALL,
      name: 'gameBitcoinMinerName',
      title: 'gameBitcoinMinerTitle',
      description: 'gameBitcoinMinerDescription',
      linkMain: linkBitcoinMinerGame,
      linkApple: URLS.REF_GAME_IOS_MINER,
      linkGoogle: URLS.REF_GAME_AND_MINER
    });
  }

  private async prepareWallets() {
    this.walletsList = await this.dbService.getBitcoinWallets(true);
  }
}
