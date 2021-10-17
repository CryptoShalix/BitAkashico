import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { LinkableIconComponent } from './shared/components/linkable-icon/linkable-icon.component';
import { PipesModule } from './shared/pipes/pipes.module';

@NgModule({
  declarations: [
    LinkableIconComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    MaterialModule,
  ],
  exports: [
    LinkableIconComponent,
    PipesModule,
  ]
})
export class SharedModule { }
