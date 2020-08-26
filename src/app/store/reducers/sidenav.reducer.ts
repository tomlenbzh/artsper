import { SidenavActionTypes } from '../actions/sidenav.actions';

export interface SidenavState {
  isOpen: boolean;
}

const initialSidenavState: SidenavState = {
  isOpen: true,
};

export function sidenavReducer(state: SidenavState = initialSidenavState, action: any): SidenavState {
  switch (action.type) {

    case SidenavActionTypes.OPEN_SIDENAV: {
      return {
        ...state,
        isOpen: true,
      };
    }

    case SidenavActionTypes.CLOSE_SIDENAV: {
      return {
        ...state,
        isOpen: false,
      };
    }
  }
}
