import { CatalogActionTypes } from '../actions/catalog.actions';
import { ArtworkList } from '../../models/catalog.model';

export interface CatalogState {
  artworksList: ArtworkList | null;
  errorMessage: string | null;
}

const initialAuthState: CatalogState = {
  artworksList: null,
  errorMessage: null
};

export function catalogReducer(state: CatalogState = initialAuthState, action: any): CatalogState {
  switch (action.type) {

    case CatalogActionTypes.FETCH_ARTWORKS_SUCCESS: {
      return {
        ...state,
        artworksList: action.payload.artworksList,
        errorMessage: null
      };
    }

    case CatalogActionTypes.FETCH_ARTWORKS_FAILURE: {
      return {
        ...state,
        artworksList: null,
        errorMessage: 'An error occurred while fetching the artworks'
      };
    }

    default: {
      return state;
    }
  }
}
