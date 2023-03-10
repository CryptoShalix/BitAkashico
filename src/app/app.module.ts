import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AppComponent } from './app.component';
import { AcademyPageComponent } from './pages/academy-page/academy-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { TradingPageComponent } from './pages/trading-page/trading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ToolsPageComponent,
    TradingPageComponent,
    GamesPageComponent,
    BooksPageComponent,
    AcademyPageComponent,
    ContactPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    SharedModule,
    PipesModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
