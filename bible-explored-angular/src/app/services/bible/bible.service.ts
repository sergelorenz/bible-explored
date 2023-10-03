import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { BibleLanguageGroup, GetBiblesResponse } from 'src/app/shared/types';
import { groupBiblesByLanguage } from 'src/app/shared/dataHandler';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  private baseUrl = 'https://api.scripture.api.bible/v1'

  constructor(private http: HttpClient) { }

  getBibles(): Observable<BibleLanguageGroup[]> {
    const url = `${this.baseUrl}/bibles`
    return this.http.get<GetBiblesResponse>(url)
      .pipe(
        map(response => {
          return groupBiblesByLanguage(response.data);
        })
      )
  }

}
