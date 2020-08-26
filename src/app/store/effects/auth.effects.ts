import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectAuthError } from '../store';

import { AuthenticationService } from '../../services/authentication.service';
import { CustomSnackbarService } from '../../services/custom-snackbar.service';

import { AuthCredentials } from '../../models/auth.model';
import { LogIn, AuthActionTypes, LogInSuccess, LogInFailure, LoadingAuthEnd, LoadingAuthStart } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  errorMessageObsv: string | null;

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private snack: CustomSnackbarService,
    private router: Router,
  ) {
    this.store.select(selectAuthError).subscribe((error) => {
      this.errorMessageObsv = error;
    });
  }

  /**
   * Login EFFECT
   * [SUCCESS]: Dispatch LogInSuccess ACTION
   * [FAILURE]: Dispatch LogInFailure ACTION
   */
  @Effect()
  LogIn: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap((payload: AuthCredentials) => {
      return this.authService.logIn(payload).pipe(
        map((user) => new LogInSuccess({ token: user.token, email: payload.email })),
        catchError((error) => of(new LogInFailure({ error })))
      );
    })
  );

  /**
   * LogInSuccess EFFECT
   * Stores TOKEN in localstorage
   * Redirects to the catalogue page
   */
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      console.log('[LOGIN SUCCESS]', user.payload);
      localStorage.setItem('userProfile', JSON.stringify(user.payload));
      setTimeout(() => {
        this.snack.open(`Welcome ${user.payload.email}!`, null, 2000, 'login-success-snackbar');
        setTimeout(() => {
          this.router.navigateByUrl('/');
          setTimeout(() => {
            this.store.dispatch(new LoadingAuthEnd({}));
          }, 1000);
        }, 500);
      }, 1000);
    })
  );

  /**
   * LogInFailure EFFECT
   * Stores TOKEN in localstorage
   * Redirects to home
   */
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((payload) => {
      console.log('[LOGIN ERROR]', payload);
      setTimeout(() => {
        this.store.dispatch(new LoadingAuthEnd({}));
        this.snack.open(`Invalid email and/or password`, 'OK', null, 'login-failure-snackbar');
      }, 1000);
    })
  );

  /**
   * LogOut EFFECT
   * Removes TOKEN in localstorage
   * Redirects to login page
   */
  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions$
    .pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
        console.log('[LOGOUT]');
        localStorage.removeItem('userProfile');
        this.router.navigateByUrl('/login');
        setTimeout(() => {
          this.snack.open('GOOD BY!', null, 2000, 'logout-snackbar');
        }, 500);
      })
    );

  /**
   * LoadingStart EFFECT
   * Stores TOKEN in localstorage
   * Redirects to home
   */
  @Effect({ dispatch: false })
  LoadingAuthStart: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOADING_AUTH_START),
    tap(() => {
      console.log('[LOADING AUTH START]');
    })
  );

  /**
   * LoadingEnd EFFECT
   * Stores TOKEN in localstorage
   * Redirects to home
   */
  @Effect({ dispatch: false })
  LoadingAuthEnd: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOADING_AUTH_END),
    tap(() => {
      console.log('[LOADING AUTH END]');
    })
  );

  /**
   * LogBackIn EFFECT
   * Logs user back in the app
   */
  @Effect({ dispatch: false })
  LogBackIn: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOG_BACK_IN),
    tap((payload) => {
      console.log('[LOG BACK IN]', payload);
    })
  );
}
