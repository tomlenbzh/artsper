import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/auth.model';

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
    const userProfile: User = JSON.parse(this.authService.getAccessToken());

    if (this.checkExcludedUrl(request.url) === true) {
      request = request.clone({
        setHeaders: { 'Content-Type': 'application/json' }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'x-token': userProfile?.token,
          'Content-Type': 'application/json',
          Authorization: 'Basic YXJ0c3BlcjpoVGsxZEE3ZmVBdDI='
        }
      });
    }
    return next.handle(request);
  }

  private checkExcludedUrl(request: string): boolean {
    const urlArray = this.urlsToNotUse.map((url) => {
      return RegExp(url, 'g').test(request) ? true : false;
    });
    return urlArray.includes(true) ? true : false;
  }

}
