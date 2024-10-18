import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface AuthStateType {
  loggedIn: boolean;
  user: Record<string, unknown> | null;
}

export const types = {
  LOGIN_REQUEST: 'AUTH/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH/LOGIN_FAILURE',

  LOGOUT_REQUEST: 'AUTH/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'AUTH/LOGOUT_SUCCESS',
  LOGOUT_FAILURE: 'AUTH/LOGOUT_FAILURE'
};

export const initialState: AuthStateType = {
  loggedIn: false,
  user: null
};

export const fetchLogin = () => {
  return apiHelper({
    types: [types.LOGIN_REQUEST, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
    method: 'POST',
    url: '/auth/sign-out'
  });
};

export const fetchLogout = () => {
  return apiHelper({
    types: [types.LOGOUT_REQUEST, types.LOGOUT_SUCCESS, types.LOGOUT_FAILURE],
    method: 'POST',
    url: '/auth/sign-out'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case types.LOGIN_SUCCESS: {
      return { ...state, loggedIn: true, user: action.data };
    }

    case types.LOGOUT_SUCCESS: {
      return { ...state, loggedIn: false, user: null };
    }

    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
