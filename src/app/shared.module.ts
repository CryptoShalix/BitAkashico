import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CoinComponent } from './shared/components/coin-info/coin-info.component';
import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';
import { PipesModule } from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    LinkableIconComponent,
    CoinComponent,
    CarouselComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    LinkableIconComponent,
    CoinComponent,
    CarouselComponent,
    PipesModule,
  ]
})
export class SharedModule { }
