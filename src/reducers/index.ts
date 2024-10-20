import { combineReducers } from 'redux';

import auth from './auth';
import projects from './projects';
import project_screens from './project-screens';

const appReducers = combineReducers({
  auth,
  projects,
  project_screens
});

export default appReducers;
