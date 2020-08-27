import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { SidenavActionTypes } from '../actions/sidenav.actions';

@Injectable()
export class SidenavEffects {

  constructor(private actions$: Actions) { }

  /**
   * OpenSidenav EFFECT
   * Opens the sidenav
   */
  @Effect({ dispatch: false })
  OpenSidenav: Observable<any> = this.actions$.pipe(
    ofType(SidenavActionTypes.OPEN_SIDENAV),
    // tap(() => console.log('[OPENING SIDENAV]'))
  );

  /**
   * CloseSidenav EFFECT
   * Closes the sidenav
   */
  @Effect({ dispatch: false })
  CloseSidenav: Observable<any> = this.actions$.pipe(
    ofType(SidenavActionTypes.CLOSE_SIDENAV),
    // tap(() => console.log('[CLOSING SIDENAV]'))
  );
}
