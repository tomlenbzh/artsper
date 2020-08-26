import { Action } from '@ngrx/store';
// import { AuthCredentials } from '../../models/auth.model';

export enum SidenavActionTypes {
  OPEN_SIDENAV = '[SIDENAV] Open',
  CLOSE_SIDENAV = '[SIDENAV] Close',
}

/**
 * OpenSidenav ACTION
 */
export class OpenSidenav implements Action {
  readonly type = SidenavActionTypes.OPEN_SIDENAV;
  constructor(readonly payload: any) { }
}

/**
 * CloseSidenav ACTION
 */
export class CloseSidenav implements Action {
  readonly type = SidenavActionTypes.CLOSE_SIDENAV;
  constructor(readonly payload: any) { }
}
