import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectSidenav, selectAuthIsAuthenticated } from '../../store/store';

import { OpenSidenav, CloseSidenav } from '../../store/actions/sidenav.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LogBackIn } from 'src/app/store/actions/auth.actions';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public toggleSidenav$: Observable<boolean>;
  public isAuthenticated$: Observable<boolean>;
  public sidenavSubscription$: Subscription;
  public isAuthenticatedSubscription$: Subscription;
  public mode = 'side';
  public isOpen = true;

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private platformService: PlatformService
  ) {
    this.toggleSidenav$ = this.store.select(selectSidenav);
    this.isAuthenticated$ = this.store.select(selectAuthIsAuthenticated);
  }

  ngOnInit(): void {

    if (this.platformService.isPlatformBrowser) {

      this.isAuthenticatedSubscription$ = this.isAuthenticated$.subscribe((isAuth: boolean) => {
        this.isAlreadyLogguedIn(isAuth);
      });

      this.sidenavSubscription$ = this.toggleSidenav$.subscribe((isOpen: boolean) => {
        if (isOpen !== undefined) {
          this.isOpen = isOpen;
        }
      });

      const mql = window.matchMedia('(max-width: 767px)');

      mql.addEventListener('change', (e: any) => {
        if (e.matches) {
          if (this.mode === 'side') {
            this.mode = 'over';
            this.store.dispatch(new CloseSidenav({}));
          }
        } else {
          if (this.mode === 'over') {
            this.mode = 'side';
            this.store.dispatch(new OpenSidenav({}));
          } else if (this.mode === 'side') {
            this.mode = 'over';
            this.store.dispatch(new OpenSidenav({}));
          }
        }
      });
    }
  }

  public toggleSidenavStatus(): void {
    if (this.isOpen === true) {
      this.store.dispatch(new CloseSidenav({}));
    } else if (this.isOpen === false) {
      this.store.dispatch(new OpenSidenav({}));
    }
  }

  onClose(): void {
    this.store.dispatch(new CloseSidenav({}));
  }

  ngOnDestroy(): void {
    this.sidenavSubscription$.unsubscribe();
    this.isAuthenticatedSubscription$.unsubscribe();
  }

  /**
   * isAlreadyLogguedIn()
   * Checks if there is already a profile in the localstorage
   */
  private isAlreadyLogguedIn(isAuth: boolean): void {
    const userProfile = JSON.parse(this.authService.getAccessToken());
    if (this.authService.getAccessToken() && !isAuth) {
      this.store.dispatch(new LogBackIn(userProfile));
    }
  }
}
