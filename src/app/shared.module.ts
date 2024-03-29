import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { AccordionComponent } from './shared/components/accordion/accordion.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CoinComponent } from './shared/components/coin-info/coin-info.component';
import { ContactFormComponent } from './shared/components/contact-form/contact-form.component';
import { CustomImageComponent } from './shared/components/custom-image/custom-image.component';
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
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
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
  ]
})
export class SharedModule { }
