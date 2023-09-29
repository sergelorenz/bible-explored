import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksAndChaptersComponent } from './books-and-chapters/books-and-chapters.component';
import { VerseOfTheDayComponent } from './verse-of-the-day/verse-of-the-day.component';
import { SideBySideComponent } from './side-by-side/side-by-side.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    BooksAndChaptersComponent,
    VerseOfTheDayComponent,
    SideBySideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
