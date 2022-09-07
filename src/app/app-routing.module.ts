import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { TradingPageComponent } from './pages/trading-page/trading-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent, pathMatch: 'full' },
  { path: 'tools', component: ToolsPageComponent, pathMatch: 'full' },
  { path: 'trading', component: TradingPageComponent, pathMatch: 'full' },
  { path: 'games', component: GamesPageComponent, pathMatch: 'full' },
  { path: 'books', component: BooksPageComponent, pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
