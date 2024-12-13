import { combineReducers } from 'redux';

import auth from './auth';
import projects from './projects';
import schema_bulbs from './schema-bulbs';
import schema_inputs from './schema-inputs';
import trends_archive from './trends-archive';
import control_gauges from './control-gauges';
import project_screens from './project-screens';
import control_switches from './control-switches';

const appReducers = combineReducers({
  auth,
  projects,
  schema_bulbs,
  schema_inputs,
  trends_archive,
  control_gauges,
  project_screens,
  control_switches
});

export default appReducers;
