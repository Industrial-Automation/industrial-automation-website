import { combineReducers } from 'redux';

import auth from './auth';
import projects from './projects';
import control_gauges from './control-gauges';
import project_screens from './project-screens';
import control_switches from './control-switches';

const appReducers = combineReducers({
  auth,
  projects,
  control_gauges,
  project_screens,
  control_switches
});

export default appReducers;
