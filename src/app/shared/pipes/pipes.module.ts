import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from './safe.pipe';
import { SearchOptionsPipe, SearchCoinsPipe } from './search.pipe';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [
    SafePipe,
    TranslatePipe,
    SearchOptionsPipe,
    SearchCoinsPipe,
  ],
  imports: [
  ],
  providers: [
    DatePipe
  ],
  exports: [
    SafePipe,
    TranslatePipe,
    SearchOptionsPipe,
    SearchCoinsPipe,
  ]
})
export class PipesModule { }
