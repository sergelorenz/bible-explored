import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksAndChaptersComponent } from './books-and-chapters/books-and-chapters.component';
import { VerseOfTheDayComponent } from './verse-of-the-day/verse-of-the-day.component';
import { SideBySideComponent } from './side-by-side/side-by-side.component';
import { FooterComponent } from './footer/footer.component';
import { HttpRequestInterceptor } from './services/http-interceptor/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    BooksAndChaptersComponent,
    VerseOfTheDayComponent,
    SideBySideComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
