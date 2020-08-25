import { Action } from '@ngrx/store';
// import { CatalogFilters } from '../../models/catalog.model';

export enum CatalogActionTypes {
  FETCH_ARTWORKS = '[CATALOG] Fetch artworks',
  FETCH_ARTWORKS_SUCCESS = '[CATALOG] Fetch artworks success',
  FETCH_ARTWORKS_FAILURE = '[CATALOG] Fetch artworks error',
  LOADING_START = '[CATALOG] LOADING Start',
  LOADING_END = '[CATALOG] LOADING End',
}

/**
 * FetchArtworks ACTION
 */
export class FetchArtworks implements Action {
  readonly type = CatalogActionTypes.FETCH_ARTWORKS;
  constructor(readonly payload: any) { }
}

/**
 * FetchArtworksSuccess ACTION
 */
export class FetchArtworksSuccess implements Action {
  readonly type = CatalogActionTypes.FETCH_ARTWORKS_SUCCESS;
  constructor(readonly payload: any) { }
}

/**
 * FetchArtworksFailure ACTION
 */
export class FetchArtworksFailure implements Action {
  readonly type = CatalogActionTypes.FETCH_ARTWORKS_FAILURE;
  constructor(readonly payload: any) { }
}

/**
 * LoadingStart ACTION
 */
export class LoadingStart implements Action {
  readonly type = CatalogActionTypes.LOADING_START;
  constructor(readonly payload: any) { }
}

/**
 * LoadingEnd ACTION
 */
export class LoadingEnd implements Action {
  readonly type = CatalogActionTypes.LOADING_END;
  constructor(readonly payload: any) { }
}
