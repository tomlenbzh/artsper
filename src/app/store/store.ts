import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { AuthState, authReducer } from './reducers/auth.reducer';
import { CatalogState, catalogReducer } from './reducers/catalog.reducer';

export interface AppState {
  auth: AuthState;
  catalog: CatalogState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  catalog: catalogReducer
};

export const selectAuth = (state: AppState) => state?.auth;

export const selectCatalog = (state: AppState) => state?.catalog;
export const selectArtworksListData = (state: AppState) => state?.catalog?.artworksList?.data;
export const selectArtworksListMeta = (state: AppState) => state?.catalog?.artworksList?.meta;
export const selectIsArtworksListLoading = (state: AppState) => state?.catalog?.isLoading;
export const selectArtworksListError = (state: AppState) => state?.catalog?.errorMessage;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
