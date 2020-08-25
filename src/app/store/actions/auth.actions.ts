import { Action } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth.model';

export enum AuthActionTypes {
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[AUTH] Logout',
  LOG_BACK_IN = '[AUTH] Log back in',
  LOADING_START = '[AUTH] LOADING Start',
  LOADING_END = '[AUTH] LOADING End',
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
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(readonly payload: any) { }
}

/**
 * LogOut ACTION
 */
export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

/**
 * LogBackIn ACTION
 */
export class LogBackIn implements Action {
  readonly type = AuthActionTypes.LOG_BACK_IN;
  constructor(readonly payload: any) { }
}

/**
 * LoadingStart ACTION
 */
export class LoadingStart implements Action {
  readonly type = AuthActionTypes.LOADING_START;
}

/**
 * LoadingEnd ACTION
 */
export class LoadingEnd implements Action {
  readonly type = AuthActionTypes.LOADING_END;
}

export type Actions =
  LogIn |
  LogInSuccess |
  LogInFailure |
  LogOut |
  LogBackIn;
