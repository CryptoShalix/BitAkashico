import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { SafePipe } from './safe.pipe';
import { TranslatePipe } from './translate.pipe';

@NgModule({
  declarations: [
    SafePipe,
    TranslatePipe
  ],
  imports: [
  ],
  providers: [
    DatePipe
  ],
  exports: [
    SafePipe,
    TranslatePipe
  ]
})
export class PipesModule { }
