import axios, { AxiosError, Method, ResponseType } from 'axios';

import store, { dispatch } from 'src/store';
import { fetchLogout } from 'src/reducers/auth';

const axiosInstance = axios.create();

const API_URL = import.meta.env.VITE_API_URL;

export interface ActionType {
  url: string;
  type?: string;
  types?: string[];
  method?: Method;
  data?: Record<string, unknown> | FormData;
  query?: Record<string, unknown>;
  timeout?: number;
  responseType?: ResponseType;
  contentType?: string;
  callback?: () => void;
}

export const apiHelper = async (action: ActionType) => {
  const [pendingType, successType, errorType] = action.types || [];

  const config = {
    baseURL: API_URL,
    url: action.url,
    method: action.method || 'get',
    data: action.data || {},
    params: action.query || {},
    timeout: action.timeout || 8000,
    responseType: action.responseType || 'json',
    headers: {}
  };

  axiosInstance.defaults.withCredentials = true;

  const headers = {
    'Content-Type': action.contentType || 'application/json'
  };

  config.headers = { ...headers };

  try {
    if (pendingType) {
      dispatch({ type: pendingType });
    }

    const response = await axiosInstance(config);

    if (successType) {
      dispatch({ type: successType, data: response.data });
    }

    if (action.type) {
      dispatch({ type: action.type, data: response.data });
    }

    return response.data;
  } catch (e: unknown) {
    const error = e as AxiosError;

    const message = error.message || 'Something went wrong';

    const statusCode = error.status;

    if (statusCode === 401) {
      await fetchLogout();
    }

    if (errorType) {
      store.dispatch({ type: errorType, error: e });
    }

    throw new Error(message);
  }
};
