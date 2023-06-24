import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { AccordionComponent } from './shared/components/accordion/accordion.component';
// import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { CoinComponent } from './shared/components/coin-info/coin-info.component';
import { ContactFormComponent } from './shared/components/contact-form/contact-form.component';
import { CustomImageComponent } from './shared/components/custom-image/custom-image.component';
import { HistoryMoneyComponent } from './shared/components/history-money/history-money.component';
import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';
import { StarRankComponent } from './shared/components/star-rank/star-rank.component';
import { MessageManagerComponent } from './shared/components/message-manager/message-manager.component';
import { DonationsComponent } from './shared/components/donations/donations.component';
import { ModalDialogComponent } from './shared/components/modal-dialog/modal-dialog.component';
import { ModalSelectorComponent } from './shared/components/modal-selector/modal-selector.component';
import { VideoResponsiveComponent } from './shared/components/video-responsive/video-responsive.component';

@NgModule({
  declarations: [
    AccordionComponent,
    // CarouselComponent,
    CoinComponent,
    ContactFormComponent,
    CustomImageComponent,
    DonationsComponent,
    HistoryMoneyComponent,
    LinkableIconComponent,
    MessageManagerComponent,
    ModalDialogComponent,
    ModalSelectorComponent,
    StarRankComponent,
    VideoResponsiveComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccordionComponent,
    // CarouselComponent,
    CoinComponent,
    ContactFormComponent,
    CustomImageComponent,
    DonationsComponent,
    HistoryMoneyComponent,
    LinkableIconComponent,
    MessageManagerComponent,
    ModalDialogComponent,
    ModalSelectorComponent,
    PipesModule,
    StarRankComponent,
    VideoResponsiveComponent,
  ]
})
export class SharedModule { }
