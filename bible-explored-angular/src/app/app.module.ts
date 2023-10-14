import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksAndChaptersComponent } from './books-and-chapters/books-and-chapters.component';
import { VerseOfTheDayComponent } from './verse-of-the-day/verse-of-the-day.component';
import { SideBySideComponent } from './side-by-side/side-by-side.component';
import { FooterComponent } from './footer/footer.component';
import { HttpRequestInterceptor } from './services/http-interceptor/http.interceptor';
import { DropdownComponent } from './shared/components/dropdown/dropdown.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    BooksAndChaptersComponent,
    VerseOfTheDayComponent,
    SideBySideComponent,
    FooterComponent,
    DropdownComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
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
