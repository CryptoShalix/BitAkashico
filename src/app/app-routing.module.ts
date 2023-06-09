import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcademyPageComponent } from './pages/academy-page/academy-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { GamesPageComponent } from './pages/games-page/games-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ToolsPageComponent } from './pages/tools-page/tools-page.component';
import { FinancesPageComponent } from './pages/finances-page/finances-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent, pathMatch: 'full' },
  { path: 'academy', component: AcademyPageComponent, pathMatch: 'full' },
  { path: 'books', component: BooksPageComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactPageComponent, pathMatch: 'full' },
  { path: 'games', component: GamesPageComponent, pathMatch: 'full' },
  { path: 'tools', component: ToolsPageComponent, pathMatch: 'full' },
  { path: 'finances', component: FinancesPageComponent, pathMatch: 'full' },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
