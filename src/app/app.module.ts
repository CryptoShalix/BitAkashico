import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';
import { PipesModule } from './shared/pipes/pipes.module';

import { AppComponent } from './app.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
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
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
