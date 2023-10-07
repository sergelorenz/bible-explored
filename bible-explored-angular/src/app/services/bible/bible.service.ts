import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs';
import { GroupOption, GetBiblesResponse } from 'src/app/shared/types';
import { groupBiblesByLanguage } from 'src/app/shared/dataHandler';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private baseUrl = 'api'

  constructor(private http: HttpClient) {
    this.getBibles();
  }

  getBibles(): Observable<GroupOption[]> {
    const url = `${this.baseUrl}/bibles`
    return this.http.get<GetBiblesResponse>(url).pipe(
      map(response => groupBiblesByLanguage(response.data)),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error', error)
    return throwError(() => new Error(error.message));
  }

}
