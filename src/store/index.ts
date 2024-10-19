import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Dispatch } from 'redux';

import appReducers from 'src/reducers';

interface DataResponseType {
  message: string;
  status: string;
  data?: Record<string, unknown> | null;
}

export interface ActionDispatchType {
  type: string;
  data?: DataResponseType;
  error?: unknown;
}

const store = createStore(appReducers, applyMiddleware(thunk));

export const dispatch: Dispatch<ActionDispatchType> = store.dispatch;

export default store;
