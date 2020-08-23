import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthenticationService } from '../../services/authentication.service';
import { AuthCredentials } from '../../models/auth.model';
import { LogIn, AuthActionTypes, LogInSuccess, LogInFailure } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) { }

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
      console.log('[LOGIN SUCCESS]', user);
      localStorage.setItem('accessToken', user.payload.token);
      this.router.navigateByUrl('/catalogue');
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
    tap((error) => {
      console.log('[LOGIN ERROR]', error);
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
        localStorage.removeItem('accessToken');
        this.router.navigateByUrl('/login');
      })
    );

  /**
   * LoadingStart EFFECT
   * Stores TOKEN in localstorage
   * Redirects to home
   */
  @Effect({ dispatch: false })
  LoadingStart: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOADING_START),
    tap(() => {
      console.log('[LOADING START]');
    })
  );

  /**
   * LoadingEnd EFFECT
   * Stores TOKEN in localstorage
   * Redirects to home
   */
  @Effect({ dispatch: false })
  LoadingEnd: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOADING_END),
    tap(() => {
      console.log('[LOADING END]');
    })
  );
}
