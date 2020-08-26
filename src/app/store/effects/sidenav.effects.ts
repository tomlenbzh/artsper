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
import { OpenSidenav, CloseSidenav, SidenavActionTypes } from '../actions/sidenav.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) { }

  /**
   * OpenSidenav EFFECT
   * Opens the sidenav
   */
  @Effect({ dispatch: false })
  OpenSidenav: Observable<any> = this.actions$.pipe(
    ofType(SidenavActionTypes.OPEN_SIDENAV),
    tap(() => {
      console.log('[OPENING SIDENAV]');
    })
  );

  /**
   * CloseSidenav EFFECT
   * Closes the sidenav
   */
  @Effect({ dispatch: false })
  CloseSidenav: Observable<any> = this.actions$.pipe(
    ofType(SidenavActionTypes.CLOSE_SIDENAV),
    tap(() => {
      console.log('[CLOSING SIDENAV]');
    })
  );
}
