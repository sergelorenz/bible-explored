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

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  private cache = new Map<string, HttpResponse<any>>();
  private readonly defaultTimeoutMilliseconds = 6000;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeoutRequest = req.clone({
      setHeaders: {
        'timeout': this.defaultTimeoutMilliseconds.toString()
      }
    })

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(timeoutRequest).pipe(
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
