import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { tap, throwError } from 'rxjs';
import { Observable, of } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();
  private readonly defaultTimeoutMilliseconds = 6000;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneRequest = req.clone({
      setHeaders: {
        'timeout': this.defaultTimeoutMilliseconds.toString(),
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Api-Key': environment.apiKey
      }
    })

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(cloneRequest).pipe(
      timeout(this.defaultTimeoutMilliseconds),
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);
        }
      }),
      catchError((error: any) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out.');
        }
        return throwError(() => new Error(error))
      })
    )
  }
}
