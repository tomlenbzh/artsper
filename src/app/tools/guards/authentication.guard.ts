import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (state.url === '/login') {
      if (!this.authService.getAccessToken()) {
        return true;
      } else {
        this.router.navigateByUrl('/catalogue');
        return true;
      }
    } else {
      console.log('state', state);
      if (!this.authService.getAccessToken()) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    }
  }
}
