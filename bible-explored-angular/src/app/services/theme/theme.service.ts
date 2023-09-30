import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme = new BehaviorSubject<string>('light');

  constructor() { }

  toggleTheme(): void {
    let currentValue = this.theme.getValue();
    let newValue  = currentValue === 'light' ? 'dark': 'light';
    this.theme.next(newValue);
  }

  getTheme(): Observable<string> {
    return this.theme.asObservable();
  }
}
