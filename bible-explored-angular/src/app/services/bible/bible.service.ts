import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs';
import { 
  Bible, 
  Book, 
  GetBiblesResponse,
  GetBooksResponse,
  GetChaptersRequest,
  GetChaptersResponse
} from 'src/app/shared/types';
import { getTotalChapters } from 'src/app/shared/dataHandler';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private baseUrl = 'api'

  constructor(private http: HttpClient) {
    this.getBibles();
  }

  getBibles(): Observable<Bible[]> {
    const url = `${this.baseUrl}/bibles`
    return this.http.get<GetBiblesResponse>(url).pipe(
      map(response => response.data),
      catchError(this.handleError)
    )
  }

  getBooks(version: string): Observable<Book[]> {
    const url = `${this.baseUrl}/bibles/${version}/books`
    return this.http.get<GetBooksResponse>(url).pipe(
      map(response => response.data),
      catchError(this.handleError)
    )
  }

  getChapterLength(chaptersRequest: GetChaptersRequest): Observable<number> {
    const { bibleId, bookId } = chaptersRequest
    const url = `${this.baseUrl}/bibles/${bibleId}/books/${bookId}/chapters`
    return this.http.get<GetChaptersResponse>(url).pipe(
      map(response => {
        let length = response.data.length;
        const lastChapter = response.data[length - 1];
        let lastChapterNumber = Number(lastChapter.number);
        if (!isNaN(lastChapterNumber)) {
          return lastChapterNumber;
        } else {
          return getTotalChapters(response.data);
        }
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error', error)
    return throwError(() => new Error(error.message));
  }

}
