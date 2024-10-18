import thunk from 'redux-thunk';
import { applyMiddleware, createStore, Dispatch } from 'redux';

import appReducers from 'src/reducers';

export interface ActionDispatchType {
  type: string;
  data?: Record<string, unknown>;
  error?: unknown;
}

const store = createStore(appReducers, applyMiddleware(thunk));

export const dispatch: Dispatch<ActionDispatchType> = store.dispatch;

export default store;
