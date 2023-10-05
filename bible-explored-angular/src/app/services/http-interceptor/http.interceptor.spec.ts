import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptor } from './http.interceptor';

describe('HttpCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpRequestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpRequestInterceptor = TestBed.inject(HttpRequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
