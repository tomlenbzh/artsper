import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthState, authReducer } from './auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};

export const selectAuth = (state: AppState) => state.auth;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
