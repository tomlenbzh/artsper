import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AuthService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PokedexGuard implements CanActivate {

  constructor(/* public authService: AuthService,*/ public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.isConnected()) {
    return true;
    // } else {
    //   this.router.navigateByUrl('login');
    //   return false;
    // }
  }
}
