import { CatalogActionTypes } from '../actions/catalog.actions';
import { ArtworkList, ArtworksFilters } from '../../models/catalog.model';
import { initalFilters } from '../../data/filters.data';

export interface CatalogState {
  isLoading: boolean | null;
  artworksList: ArtworkList | null;
  errorMessage: string | null;
  filters: ArtworksFilters;
}

const initialAuthState: CatalogState = {
  isLoading: false,
  artworksList: null,
  errorMessage: null,
  filters: initalFilters
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

    case CatalogActionTypes.LOADING_ARTWORKS_START: {
      return {
        ...state,
        isLoading: true
      };
    }

    case CatalogActionTypes.LOADING_ARTWORKS_END: {
      return {
        ...state,
        isLoading: false
      };
    }

    case CatalogActionTypes.APPLY_FILTERS: {
      return {
        ...state,
        filters: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
