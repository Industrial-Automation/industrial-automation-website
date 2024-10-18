import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface AuthStateType {
  loggedIn: boolean;
  user: Record<string, unknown> | null;
}

export const types = {
  REGISTRATION_REQUEST: 'AUTH/REGISTRATION_REQUEST',
  REGISTRATION_SUCCESS: 'AUTH/REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE: 'AUTH/REGISTRATION_FAILURE',

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

export const fetchRegistration = (data: Record<string, unknown>) => {
  return apiHelper({
    types: [types.REGISTRATION_REQUEST, types.REGISTRATION_SUCCESS, types.REGISTRATION_FAILURE],
    method: 'POST',
    url: '/auth/sign-up',
    data
  });
};

export const fetchLogin = (data: Record<string, unknown>) => {
  return apiHelper({
    types: [types.LOGIN_REQUEST, types.LOGIN_SUCCESS, types.LOGIN_FAILURE],
    method: 'POST',
    url: '/auth/sign-in',
    data
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
    case types.REGISTRATION_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case types.REGISTRATION_SUCCESS: {
      return { ...state };
    }

    case types.LOGIN_SUCCESS: {
      sessionStorage.setItem('auth', JSON.stringify({ loggedIn: true }));

      return { ...state, user: action.data };
    }

    case types.LOGOUT_SUCCESS: {
      sessionStorage.removeItem('auth');

      return { ...state, user: null };
    }

    case types.REGISTRATION_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
