import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UtilService } from '@core/services/util.service';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private us: UtilService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.us.showAlert('error','Something Went Wrong!', error?.error?.message);
          return throwError(error?.error?.message);
        })
      )
  }
}
