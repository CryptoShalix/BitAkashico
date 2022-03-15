import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CoinComponent } from './shared/components/coin-info/coin-info.component';
import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';
import { StarRankComponent } from './shared/components/star-rank/star-rank.component';

@NgModule({
  declarations: [
    CarouselComponent,
    CoinComponent,
    LinkableIconComponent,
    StarRankComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    PipesModule,
    CarouselComponent,
    CoinComponent,
    LinkableIconComponent,
    StarRankComponent,
  ]
})
export class SharedModule { }
