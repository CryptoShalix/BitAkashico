import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaIconComponent } from './shared/components/social-media-icon/social-media-icon.component';

@NgModule({
  declarations: [
    SocialMediaIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SocialMediaIconComponent
  ]
})
export class SharedModule { }
