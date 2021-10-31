import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainPageComponent } from './main-page.component';

const mainPageRoutes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(mainPageRoutes)
  ]
})
export class MainPageRoutingModule { }
