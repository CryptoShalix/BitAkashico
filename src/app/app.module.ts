import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SharedModule } from './shared.module';
import { PipesModule } from './shared/pipes/pipes.module';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    PipesModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
