import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;
  private urlsToNotUse: Array<string>;

  constructor(private injector: Injector) {
    this.urlsToNotUse = ['login'];
  }

  /**
   * TokenInterceptor()
   * @param request,
   * @param next
   * Retrieves and injects access token in every new Http request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.authService = this.injector.get(AuthenticationService);
    const token: string = this.authService.getAccessToken();

    if (this.checkExcludedUrl(request.url) === true) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'x-token': token
        }
      });
    }
    console.log('[REQUEST]', request);
    return next.handle(request);
  }

  private checkExcludedUrl(request: string): boolean {
    const urlArray = this.urlsToNotUse.map((url) => {
      return RegExp(url, 'g').test(request) ? true : false;
    });
    return urlArray.includes(true) ? true : false;
  }

}