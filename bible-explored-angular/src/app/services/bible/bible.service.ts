import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  private baseUrl = 'https://api.scripture.api.bible/v1'

  constructor(private http: HttpClient) { }
}
