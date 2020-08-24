import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { CatalogueService } from '../../services/catalogue.service';
// import { AuthCredentials } from '../../models/auth.model';
import { CatalogActionTypes, FetchArtworks, FetchArtworksSuccess, FetchArtworksFailure } from '../actions/catalog.actions';
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
        // tap((artworksList) => console.log('PAYLOAD', artworksList)),
        map((artworksList: ArtworkList) => {
          return new FetchArtworksSuccess({ artworksList });
        }),
        catchError((error) => of(new FetchArtworksFailure({ error })))
      );
    })
  );

  /**
   * FetchArtworksSuccess EFFECT
   * Logs SUCCESS
   * Logs Artworks list
   */
  @Effect({ dispatch: false })
  FetchArtworksSuccess: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.FETCH_ARTWORKS_SUCCESS),
    // tap((artworksList) => {
    //   console.log('[FETCH ARTWORKS SUCCESS]', artworksList);
    // })
  );

  /**
   * FetchArtworksFailure EFFECT
   * Logs Error
   */
  @Effect({ dispatch: false })
  FetchArtworksFailure: Observable<any> = this.actions$.pipe(
    ofType(CatalogActionTypes.FETCH_ARTWORKS_FAILURE),
    tap((error) => {
      console.log('[FETCH ARTWORKS ERROR]', error);
    })
  );
}
