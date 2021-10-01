import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from './shared/pipes/pipes.module';
import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';

@NgModule({
  declarations: [
    LinkableIconComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    LinkableIconComponent,
    PipesModule,
  ]
})
export class SharedModule { }
