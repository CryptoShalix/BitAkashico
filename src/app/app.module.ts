import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { FinancesPageComponent } from './pages/finances-page/finances-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { MessageService } from './shared/services/message.service';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { StorageService } from './shared/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AcademyPageComponent,
    BooksPageComponent,
    ContactPageComponent,
    FinancesPageComponent,
    GamesPageComponent,
    MainPageComponent,
    StartPageComponent,
    ToolsPageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
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
    },
    MessageService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
