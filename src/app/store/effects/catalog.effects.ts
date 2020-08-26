import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { CatalogueService } from '../../services/catalogue.service';
import {
  CatalogActionTypes,
  FetchArtworks,
  FetchArtworksSuccess,
  FetchArtworksFailure,
  LoadingArtworksEnd
} from '../actions/catalog.actions';
import { ArtworkList } from '../../models/catalog.model';

@Injectable()
export class CatalogEffects {

  constructor(
    private actions$: Actions,
    private catalogueService: CatalogueService,
    private router: Router
  ) { }

  /**
   * FetchArtworks EFFECT
   * [SUCCESS]: Dispatch FetchArtworksSuccess ACTION
   * [FAILURE]: Dispatch FetchArtworksFailure ACTION
   */
  @Effect()
  FetchArtworks: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.FETCH_ARTWORKS),
    map((action: FetchArtworks) => action.payload),
    switchMap((payload: any) => {
      return this.catalogueService.getCatalogue(payload).pipe(
        map((artworksList: ArtworkList) => new FetchArtworksSuccess({ artworksList })),
        catchError((error) => of(new FetchArtworksFailure({ error })))
      );
    })
  );

  /**
   * FetchArtworksSuccess EFFECT
   * Logs SUCCESS
   * Logs Artworks list
   */
  @Effect()
  FetchArtworksSuccess: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.FETCH_ARTWORKS_SUCCESS),
    tap((artworksList) => console.log('[FETCH ARTWORKS SUCCESS]', artworksList)),
    mapTo(new LoadingArtworksEnd({}))
  );

  /**
   * FetchArtworksFailure EFFECT
   * Logs Error
   */
  @Effect()
  FetchArtworksFailure: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.FETCH_ARTWORKS_FAILURE),
    tap((error) => console.log('[FETCH ARTWORKS ERROR]', error)),
    mapTo(new LoadingArtworksEnd({}))
  );

  /**
   * LoadingStart EFFECT
   */
  @Effect({ dispatch: false })
  LoadingArtworksStart: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.LOADING_ARTWORKS_START),
    tap((error) => {
      console.log('[LOADING START]', error);
    })
  );

  /**
   * LoadingEnd EFFECT
   */
  @Effect({ dispatch: false })
  LoadingArtworksEnd: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.LOADING_ARTWORKS_END),
    tap((error) => {
      console.log('[LOADING END]', error);
    })
  );

  /**
   * ApplyFilters EFFECT
   */
  @Effect({ dispatch: false })
  ApplyFilters: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.APPLY_FILTERS),
    tap((payload) => {
      console.log('[APPLY FILTERS]', payload);
    })
  );
}
