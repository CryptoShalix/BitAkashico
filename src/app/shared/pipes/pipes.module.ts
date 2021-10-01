import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [SafePipe],
  imports: [
  ],
  providers: [
    DatePipe
  ],
  exports: [SafePipe]
})
export class PipesModule { }
