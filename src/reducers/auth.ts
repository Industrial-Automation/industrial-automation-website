import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface LoggedUserType {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  is_confirmed: boolean;
}

export interface AuthStateType {
  user: LoggedUserType | null;
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
  LOGOUT_FAILURE: 'AUTH/LOGOUT_FAILURE',

  ME_REQUEST: 'AUTH/ME_REQUEST',
  ME_SUCCESS: 'AUTH/ME_SUCCESS',
  ME_FAILURE: 'AUTH/ME_FAILURE'
};

export const initialState: AuthStateType = {
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

export const fetchMe = () => {
  return apiHelper({
    types: [types.ME_REQUEST, types.ME_SUCCESS, types.ME_FAILURE],
    url: '/auth/me'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.REGISTRATION_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOGOUT_REQUEST:
    case types.ME_REQUEST: {
      return { ...state, isLoading: true, error: null };
    }

    case types.REGISTRATION_SUCCESS: {
      return { ...state };
    }

    case types.LOGIN_SUCCESS:
    case types.ME_SUCCESS: {
      return { ...state, user: action.data?.data?.user || null };
    }

    case types.LOGOUT_SUCCESS: {
      return { ...state, user: null };
    }

    case types.REGISTRATION_FAILURE:
    case types.LOGIN_FAILURE:
    case types.LOGOUT_FAILURE:
    case types.ME_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
