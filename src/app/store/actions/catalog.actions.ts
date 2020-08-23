import { Action } from '@ngrx/store';
// import { CatalogFilters } from '../../models/catalog.model';

export enum CatalogActionTypes {
  FETCH_ARTWORKS = '[CATALOG] Fetch artworks',
  FETCH_ARTWORKS_SUCCESS = '[CATALOG] Fetch artworks success',
  FETCH_ARTWORKS_FAILURE = '[CATALOG] Fetch artworks error',
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
