import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface ProjectType {
  id: string;
  name: string;
  opc_url: string;
  opc_namespace_index: number;
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
  CREATE_PROJECT_FAILURE: 'PROJECTS/CREATE_PROJECT_FAILURE',

  UPDATE_PROJECT_REQUEST: 'PROJECTS/UPDATE_PROJECT_REQUEST',
  UPDATE_PROJECT_SUCCESS: 'PROJECTS/UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAILURE: 'PROJECTS/UPDATE_PROJECT_FAILURE',

  DELETE_PROJECT_REQUEST: 'PROJECTS/DELETE_PROJECT_REQUEST',
  DELETE_PROJECT_SUCCESS: 'PROJECTS/DELETE_PROJECT_SUCCESS',
  DELETE_PROJECT_FAILURE: 'PROJECTS/DELETE_PROJECT_FAILURE'
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

export const fetchCreateProject = (data: Partial<ProjectType>) => {
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

export const fetchUpdateProject = (id: string, data: Partial<ProjectType>) => {
  return apiHelper({
    types: [
      types.UPDATE_PROJECT_REQUEST,
      types.UPDATE_PROJECT_SUCCESS,
      types.UPDATE_PROJECT_FAILURE
    ],
    url: `/projects/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteProject = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_PROJECT_REQUEST,
      types.DELETE_PROJECT_SUCCESS,
      types.DELETE_PROJECT_FAILURE
    ],
    url: `/projects/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_PROJECTS_REQUEST:
    case types.CREATE_PROJECT_REQUEST:
    case types.UPDATE_PROJECT_REQUEST:
    case types.DELETE_PROJECT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_PROJECTS_SUCCESS:
      return { ...state, projects: action.data?.data?.projects || [] };

    case types.CREATE_PROJECT_SUCCESS:
      return { ...state, projects: [...state.projects, ...([action.data?.data?.project] || [])] };

    case types.UPDATE_PROJECT_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === (data?.project as ProjectType).id ? data?.project : project
        )
      };
    }

    case types.DELETE_PROJECT_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== (data?.project as ProjectType).id
        )
      };
    }

    case types.GET_PROJECTS_FAILURE:
    case types.CREATE_PROJECT_FAILURE:
    case types.UPDATE_PROJECT_FAILURE:
    case types.DELETE_PROJECT_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
