import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface ProjectScreenType {
  id: string;
  project_id: string;
  order: number;
  name: string;
  schema_url: string;
  created_at: string;
  last_updated_at: string;
}

export interface ProjectScreensStateType {
  project_screens: ProjectScreenType[];
}

export const types = {
  GET_PROJECT_SCREENS_REQUEST: 'PROJECT_SCREENS/GET_PROJECT_SCREENS_REQUEST',
  GET_PROJECT_SCREENS_SUCCESS: 'PROJECT_SCREENS/GET_PROJECT_SCREENS_SUCCESS',
  GET_PROJECT_SCREENS_FAILURE: 'PROJECT_SCREENS/GET_PROJECT_SCREENS_FAILURE',

  CREATE_PROJECT_SCREEN_REQUEST: 'PROJECT_SCREENS/CREATE_PROJECT_SCREEN_REQUEST',
  CREATE_PROJECT_SCREEN_SUCCESS: 'PROJECT_SCREENS/CREATE_PROJECT_SCREEN_SUCCESS',
  CREATE_PROJECT_SCREEN_FAILURE: 'PROJECT_SCREENS/CREATE_PROJECT_SCREEN_FAILURE',

  UPDATE_PROJECT_SCREEN_REQUEST: 'PROJECT_SCREENS/UPDATE_PROJECT_SCREEN_REQUEST',
  UPDATE_PROJECT_SCREEN_SUCCESS: 'PROJECT_SCREENS/UPDATE_PROJECT_SCREEN_SUCCESS',
  UPDATE_PROJECT_SCREEN_FAILURE: 'PROJECT_SCREENS/UPDATE_PROJECT_SCREEN_FAILURE',

  DELETE_PROJECT_SCREEN_REQUEST: 'PROJECT_SCREENS/DELETE_PROJECT_SCREEN_REQUEST',
  DELETE_PROJECT_SCREEN_SUCCESS: 'PROJECT_SCREENS/DELETE_PROJECT_SCREEN_SUCCESS',
  DELETE_PROJECT_SCREEN_FAILURE: 'PROJECT_SCREENS/DELETE_PROJECT_SCREEN_FAILURE',

  UPLOAD_PROJECT_SCREEN_REQUEST: 'PROJECT_SCREENS/UPLOAD_PROJECT_SCREEN_REQUEST',
  UPLOAD_PROJECT_SCREEN_SUCCESS: 'PROJECT_SCREENS/UPLOAD_PROJECT_SCREEN_SUCCESS',
  UPLOAD_PROJECT_SCREEN_FAILURE: 'PROJECT_SCREENS/UPLOAD_PROJECT_SCREEN_FAILURE'
};

export const initialState: ProjectScreensStateType = {
  project_screens: []
};

export const fetchGetProjectScreens = (projectId: string) => {
  return apiHelper({
    types: [
      types.GET_PROJECT_SCREENS_REQUEST,
      types.GET_PROJECT_SCREENS_SUCCESS,
      types.GET_PROJECT_SCREENS_FAILURE
    ],
    url: `/project-screens?project_id=${projectId}`
  });
};

export const fetchCreateProjectScreen = (data: Partial<ProjectScreenType>) => {
  return apiHelper({
    types: [
      types.CREATE_PROJECT_SCREEN_REQUEST,
      types.CREATE_PROJECT_SCREEN_SUCCESS,
      types.CREATE_PROJECT_SCREEN_FAILURE
    ],
    url: '/project-screens',
    method: 'POST',
    data
  });
};

export const fetchUpdateProjectScreen = (id: string, data: Partial<ProjectScreenType>) => {
  return apiHelper({
    types: [
      types.UPDATE_PROJECT_SCREEN_REQUEST,
      types.UPDATE_PROJECT_SCREEN_SUCCESS,
      types.UPDATE_PROJECT_SCREEN_FAILURE
    ],
    url: `/project-screens/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteProjectScreen = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_PROJECT_SCREEN_REQUEST,
      types.DELETE_PROJECT_SCREEN_SUCCESS,
      types.DELETE_PROJECT_SCREEN_FAILURE
    ],
    url: `/project-screens/${id}`,
    method: 'DELETE'
  });
};

export const fetchUploadProjectScreen = (id: string, data: FormData) => {
  return apiHelper({
    types: [
      types.UPDATE_PROJECT_SCREEN_REQUEST,
      types.UPDATE_PROJECT_SCREEN_SUCCESS,
      types.UPDATE_PROJECT_SCREEN_FAILURE
    ],
    url: `/project-screens/upload/${id}`,
    method: 'POST',
    contentType: 'multipart/form-data',
    timeout: 60000,
    data
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_PROJECT_SCREENS_REQUEST:
    case types.CREATE_PROJECT_SCREEN_REQUEST:
    case types.UPDATE_PROJECT_SCREEN_REQUEST:
    case types.DELETE_PROJECT_SCREEN_REQUEST:
    case types.UPLOAD_PROJECT_SCREEN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_PROJECT_SCREENS_SUCCESS:
    case types.CREATE_PROJECT_SCREEN_SUCCESS:
    case types.DELETE_PROJECT_SCREEN_SUCCESS:
      return { ...state, project_screens: action.data?.data?.project_screens || [] };

    case types.UPDATE_PROJECT_SCREEN_SUCCESS:
    case types.UPLOAD_PROJECT_SCREEN_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        project_screens: state.project_screens.map((project_screen) =>
          project_screen.id === (data?.project_screen as ProjectScreenType).id
            ? data?.project_screen
            : project_screen
        )
      };
    }

    case types.GET_PROJECT_SCREENS_FAILURE:
    case types.CREATE_PROJECT_SCREEN_FAILURE:
    case types.UPDATE_PROJECT_SCREEN_FAILURE:
    case types.DELETE_PROJECT_SCREEN_FAILURE:
    case types.UPLOAD_PROJECT_SCREEN_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
