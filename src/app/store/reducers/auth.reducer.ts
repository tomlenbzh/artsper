import { User } from '../../models/auth.model';
import { AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

const initialAuthState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer(state: AuthState = initialAuthState, action: any): AuthState {
  switch (action.type) {

    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    case AuthActionTypes.LOADING_START: {
      return {
        ...state,
        isLoading: true
      };
    }

    case AuthActionTypes.LOADING_END: {
      return {
        ...state,
        isLoading: false
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialAuthState;
    }

    default: {
      return state;
    }
  }
}
