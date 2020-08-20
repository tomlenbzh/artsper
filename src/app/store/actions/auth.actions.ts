import { Action } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth.model';

export enum AuthActionTypes {
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[AUTH] Logout',
}

/**
 * LogIn ACTION
 */
export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(readonly payload: AuthCredentials) { }
}

/**
 * LogInSuccess ACTION
 */
export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(readonly payload: any) { }
}

/**
 * LogInFailure ACTION
 */
export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(readonly payload: any) { }
}

/**
 * LogOut ACTION
 */
export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export type Actions =
  LogIn |
  LogInSuccess |
  LogInFailure |
  LogOut;
