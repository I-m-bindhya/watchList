import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
/**
 * Interceptor to capture api errors and perform operations
 */
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  exceptionalUrls: string[] = [];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // remove queryparams and fragments from url
    return next.handle(req).pipe(
      // perform operations if request end up in error
      catchError((error) => {
        console.log(error);
        let throwable = error.error || error.statusText;

        //throw the error
        return throwError(() => throwable);
      })
    );
  }
}
