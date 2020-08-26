import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { AuthState, authReducer } from './reducers/auth.reducer';
import { CatalogState, catalogReducer } from './reducers/catalog.reducer';
import { SidenavState, sidenavReducer, } from './reducers/sidenav.reducer';

export interface AppState {
  auth: AuthState;
  catalog: CatalogState;
  sidenav: SidenavState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  catalog: catalogReducer,
  sidenav: sidenavReducer
};

export const selectSidenav = (state: AppState) => state?.sidenav?.isOpen;

export const selectAuth = (state: AppState) => state?.auth;
export const selectAuthError = (state: AppState) => state?.auth?.errorMessage;
export const selectAuthLoading = (state: AppState) => state?.auth?.isLoading;
export const selectAuthEmail = (state: AppState) => state?.auth?.user?.email;
export const selectAuthIsAuthenticated = (state: AppState) => state?.auth?.isAuthenticated;

export const selectCatalog = (state: AppState) => state?.catalog;
export const selectArtworksFilters = (state: AppState) => state?.catalog.filters;
export const selectArtworksListData = (state: AppState) => state?.catalog?.artworksList?.data;
export const selectArtworksListMeta = (state: AppState) => state?.catalog?.artworksList?.meta;
export const selectIsArtworksListLoading = (state: AppState) => state?.catalog?.isLoading;
export const selectArtworksListError = (state: AppState) => state?.catalog?.errorMessage;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
