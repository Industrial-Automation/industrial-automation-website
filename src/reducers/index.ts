import { combineReducers } from 'redux';

import auth from './auth';
import projects from './projects';

const appReducers = combineReducers({
  auth,
  projects
});

export default appReducers;
