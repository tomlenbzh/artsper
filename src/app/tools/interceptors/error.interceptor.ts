import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  /**
   * ErrorInterceptor()
   * @param request,
   * @param next
   * Catches Http requests errors
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse && response.status === 401) {
          localStorage.removeItem('userProfile');
          this.router.navigateByUrl('/login');
        }
        return throwError(new Error(response));
      })
    );
  }
}
