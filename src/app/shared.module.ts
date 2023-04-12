import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { AccordionComponent } from './shared/components/accordion/accordion.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CoinComponent } from './shared/components/coin-info/coin-info.component';
import { ContactFormComponent } from './shared/components/contact-form/contact-form.component';
import { CustomImageComponent } from './shared/components/custom-image/custom-image.component';
import { HistoryMoneyComponent } from './shared/components/history-money/history-money.component';
import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';
import { StarRankComponent } from './shared/components/star-rank/star-rank.component';

@NgModule({
  declarations: [
    AccordionComponent,
    CarouselComponent,
    CoinComponent,
    LinkableIconComponent,
    StarRankComponent,
    CustomImageComponent,
    ContactFormComponent,
    HistoryMoneyComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    PipesModule,
    AccordionComponent,
    CarouselComponent,
    CoinComponent,
    LinkableIconComponent,
    StarRankComponent,
    CustomImageComponent,
    ContactFormComponent,
    HistoryMoneyComponent,
  ]
})
export class SharedModule { }
