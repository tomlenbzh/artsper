import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { PlatformService } from 'src/app/services/platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (state.url === '/login') {
      if (!this.authService.getAccessToken()) {
        return true;
      } else {
        this.router.navigateByUrl('/home');
        return true;
      }
    } else {
      if (!this.authService.getAccessToken()) {
        this.router.navigateByUrl('/login');
        return false;
      } else {
        return true;
      }
    }
  }
}
