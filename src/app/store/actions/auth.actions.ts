import { Action } from '@ngrx/store';
import { AuthCredentials } from '../../models/auth.model';

export enum AuthActionTypes {
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[AUTH] Logout',
  LOG_BACK_IN = '[AUTH] Log back in',
  LOADING_AUTH_START = '[AUTH] LOADING Auth Start',
  LOADING_AUTH_END = '[AUTH] LOADING Auth End',
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
  constructor(readonly payload: any) { }
}

/**
 * LogBackIn ACTION
 */
export class LogBackIn implements Action {
  readonly type = AuthActionTypes.LOG_BACK_IN;
  constructor(readonly payload: any) { }
}

/**
 * LoadingAuthStart ACTION
 */
export class LoadingAuthStart implements Action {
  readonly type = AuthActionTypes.LOADING_AUTH_START;
  constructor(readonly payload: any) { }
}

/**
 * LoadingAuthEnd ACTION
 */
export class LoadingAuthEnd implements Action {
  readonly type = AuthActionTypes.LOADING_AUTH_END;
  constructor(readonly payload: any) { }
}

export type Actions =
  LogIn |
  LogInSuccess |
  LogInFailure |
  LogOut |
  LogBackIn |
  LoadingAuthStart |
  LoadingAuthEnd;
