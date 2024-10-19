import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface ProjectType {
  id: string;
  name: string;
  created_at: string;
  last_updated_at: string;
}

export interface ProjectsStateType {
  projects: ProjectType[];
}

export const types = {
  GET_PROJECTS_REQUEST: 'PROJECTS/GET_PROJECTS_REQUEST',
  GET_PROJECTS_SUCCESS: 'PROJECTS/GET_PROJECTS_SUCCESS',
  GET_PROJECTS_FAILURE: 'PROJECTS/GET_PROJECTS_FAILURE',

  CREATE_PROJECT_REQUEST: 'PROJECTS/CREATE_PROJECT_REQUEST',
  CREATE_PROJECT_SUCCESS: 'PROJECTS/CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAILURE: 'PROJECTS/CREATE_PROJECT_FAILURE'
};

export const initialState: ProjectsStateType = {
  projects: []
};

export const fetchGetProjects = () => {
  return apiHelper({
    types: [types.GET_PROJECTS_REQUEST, types.GET_PROJECTS_SUCCESS, types.GET_PROJECTS_FAILURE],
    url: '/projects'
  });
};

export const fetchCreateProject = (data: Record<string, unknown>) => {
  return apiHelper({
    types: [
      types.CREATE_PROJECT_REQUEST,
      types.CREATE_PROJECT_SUCCESS,
      types.CREATE_PROJECT_FAILURE
    ],
    url: '/projects',
    method: 'POST',
    data
  });
};

export const fetchDeleteProject = (id: string) => {
  return apiHelper({
    url: `/projects/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_PROJECTS_REQUEST:
    case types.CREATE_PROJECT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.data?.data?.projects || [] };

    case types.CREATE_PROJECT_SUCCESS:
      return { ...state, projects: [...state.projects, ...([action.data?.data?.project] || [])] };

    case types.GET_PROJECTS_FAILURE:
    case types.CREATE_PROJECT_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
