import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface SchemaBulbType {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  warning_min_value: number | null;
  warning_max_value: number | null;
  critical_min_value: number | null;
  critical_max_value: number | null;
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}

export interface SchemaBulbsStateType {
  schema_bulbs: SchemaBulbType[];
}

export const types = {
  GET_SCHEMA_BULBS_REQUEST: 'SCHEMA_BULBS/GET_SCHEMA_BULBS_REQUEST',
  GET_SCHEMA_BULBS_SUCCESS: 'SCHEMA_BULBS/GET_SCHEMA_BULBS_SUCCESS',
  GET_SCHEMA_BULBS_FAILURE: 'SCHEMA_BULBS/GET_SCHEMA_BULBS_FAILURE',

  CREATE_SCHEMA_BULB_REQUEST: 'SCHEMA_BULBS/CREATE_SCHEMA_BULB_REQUEST',
  CREATE_SCHEMA_BULB_SUCCESS: 'SCHEMA_BULBS/CREATE_SCHEMA_BULB_SUCCESS',
  CREATE_SCHEMA_BULB_FAILURE: 'SCHEMA_BULBS/CREATE_SCHEMA_BULB_FAILURE',

  UPDATE_SCHEMA_BULB_REQUEST: 'SCHEMA_BULBS/UPDATE_SCHEMA_BULB_REQUEST',
  UPDATE_SCHEMA_BULB_SUCCESS: 'SCHEMA_BULBS/UPDATE_SCHEMA_BULB_SUCCESS',
  UPDATE_SCHEMA_BULB_FAILURE: 'SCHEMA_BULBS/UPDATE_SCHEMA_BULB_FAILURE',

  DELETE_SCHEMA_BULB_REQUEST: 'SCHEMA_BULBS/DELETE_SCHEMA_BULB_REQUEST',
  DELETE_SCHEMA_BULB_SUCCESS: 'SCHEMA_BULBS/DELETE_SCHEMA_BULB_SUCCESS',
  DELETE_SCHEMA_BULB_FAILURE: 'SCHEMA_BULBS/DELETE_SCHEMA_BULB_FAILURE'
};

export const initialState: SchemaBulbsStateType = {
  schema_bulbs: []
};

export const fetchGetSchemaBulbs = (screenId: string) => {
  return apiHelper({
    types: [
      types.GET_SCHEMA_BULBS_REQUEST,
      types.GET_SCHEMA_BULBS_SUCCESS,
      types.GET_SCHEMA_BULBS_FAILURE
    ],
    url: `/schema-bulbs?screen_id=${screenId}`
  });
};

export const fetchCreateSchemaBulb = (data: Partial<SchemaBulbType>) => {
  return apiHelper({
    types: [
      types.CREATE_SCHEMA_BULB_REQUEST,
      types.CREATE_SCHEMA_BULB_SUCCESS,
      types.CREATE_SCHEMA_BULB_FAILURE
    ],
    url: '/schema-bulbs',
    method: 'POST',
    data
  });
};

export const fetchUpdateSchemaBulb = (id: string, data: Partial<SchemaBulbType>) => {
  return apiHelper({
    types: [
      types.UPDATE_SCHEMA_BULB_REQUEST,
      types.UPDATE_SCHEMA_BULB_SUCCESS,
      types.UPDATE_SCHEMA_BULB_FAILURE
    ],
    url: `/schema-bulbs/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteSchemaBulb = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_SCHEMA_BULB_REQUEST,
      types.DELETE_SCHEMA_BULB_SUCCESS,
      types.DELETE_SCHEMA_BULB_FAILURE
    ],
    url: `/schema-bulbs/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_SCHEMA_BULBS_REQUEST:
    case types.CREATE_SCHEMA_BULB_REQUEST:
    case types.UPDATE_SCHEMA_BULB_REQUEST:
    case types.DELETE_SCHEMA_BULB_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_SCHEMA_BULBS_SUCCESS:
      return { ...state, schema_bulbs: action.data?.data?.schema_bulbs || [] };

    case types.CREATE_SCHEMA_BULB_SUCCESS:
      return {
        ...state,
        schema_bulbs: [...state.schema_bulbs, ...([action.data?.data?.schema_bulb] || [])]
      };

    case types.UPDATE_SCHEMA_BULB_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        schema_bulbs: state.schema_bulbs.map((schema_bulb) =>
          schema_bulb.id === (data?.schema_bulb as SchemaBulbType).id
            ? data?.schema_bulb
            : schema_bulb
        )
      };
    }

    case types.DELETE_SCHEMA_BULB_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        schema_bulbs: state.schema_bulbs.filter(
          (schema_bulb) => schema_bulb.id !== (data?.schema_bulb as SchemaBulbType).id
        )
      };
    }

    case types.GET_SCHEMA_BULBS_FAILURE:
    case types.CREATE_SCHEMA_BULB_FAILURE:
    case types.UPDATE_SCHEMA_BULB_FAILURE:
    case types.DELETE_SCHEMA_BULB_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
