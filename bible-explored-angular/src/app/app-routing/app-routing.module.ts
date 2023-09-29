import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { BooksAndChaptersComponent } from '../books-and-chapters/books-and-chapters.component';
import { VerseOfTheDayComponent } from '../verse-of-the-day/verse-of-the-day.component';
import { SideBySideComponent } from '../side-by-side/side-by-side.component';
import { MENU_BOOKS_AND_CHAPTERS, MENU_HOME, MENU_SIDE_BY_SIDE, MENU_VERSE_OF_THE_DAY } from '../shared/constants';

const routes: Routes = [
  { path: MENU_HOME, component: HomeComponent },
  { path: MENU_BOOKS_AND_CHAPTERS, component: BooksAndChaptersComponent },
  { path: MENU_VERSE_OF_THE_DAY, component: VerseOfTheDayComponent },
  { path: MENU_SIDE_BY_SIDE, component: SideBySideComponent },
  { path: '', redirectTo: `/${MENU_HOME}`, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
