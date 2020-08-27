import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectSidenav, selectAuthIsAuthenticated } from '../../store/store';

import { OpenSidenav, CloseSidenav } from '../../store/actions/sidenav.actions';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { LogBackIn } from '../../store/actions/auth.actions';
import { PlatformService } from '../../services/platform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  public toggleSidenav$: Observable<boolean>;
  public sidenavSubscription$: Subscription;

  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedSubscription$: Subscription;

  public mode = 'side';
  public isOpen = false;
  private noSidebar: boolean;

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private platformService: PlatformService,
    private router: Router
  ) {
    this.toggleSidenav$ = this.store.select(selectSidenav);
    this.isAuthenticated$ = this.store.select(selectAuthIsAuthenticated);
    this.router.events.subscribe((val: any) => {
      if (val.url !== `/catalogue` && val.url !== `/artworks-details`) {
        this.noSidebar = true;
        this.isOpen = false;
        this.store.dispatch(new CloseSidenav({}));
      } else {
        this.noSidebar = false;
        this.isOpen = true;
        this.store.dispatch(new OpenSidenav({}));
      }
    });
  }

  ngOnInit(): void {

    const mql = window.matchMedia('(max-width: 767px)');

    if (this.platformService.isPlatformBrowser) {
      this.isAuthenticatedSubscription$ = this.isAuthenticated$.subscribe((isAuth: boolean) => {
        this.isAlreadyLogguedIn(isAuth);
      });
      this.sidenavSubscription$ = this.toggleSidenav$.subscribe((isOpen: boolean) => {
        if (isOpen !== undefined && !this.noSidebar) {
          this.isOpen = isOpen;
        }
      });

      mql.addEventListener('change', (event$: any) => {
        if (event$.matches) {
          if (this.mode === 'side' && !this.noSidebar) {
            this.mode = 'over';
            this.store.dispatch(new CloseSidenav({}));
          }
        } else {
          if (this.mode === 'over' && !this.noSidebar) {
            this.mode = 'side';
            this.store.dispatch(new OpenSidenav({}));
          } else if (this.mode === 'side' && !this.noSidebar) {
            this.mode = 'over';
            this.store.dispatch(new OpenSidenav({}));
          }
        }
      });
    }
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

  /**
   * onClose()
   * Close the sidebar if it is enabled on the page
   */
  onClose(): void {
    if (!this.noSidebar) {
      this.store.dispatch(new CloseSidenav({}));
    }
  }
}
