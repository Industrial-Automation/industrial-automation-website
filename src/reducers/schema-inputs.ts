import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface SchemaInputType {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  unit: string;
  width: number;
  height: number;
  x: number;
  y: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}

export interface SchemaInputsStateType {
  schema_inputs: SchemaInputType[];
}

export const types = {
  GET_SCHEMA_INPUTS_REQUEST: 'SCHEMA_INPUTS/GET_SCHEMA_INPUTS_REQUEST',
  GET_SCHEMA_INPUTS_SUCCESS: 'SCHEMA_INPUTS/GET_SCHEMA_INPUTS_SUCCESS',
  GET_SCHEMA_INPUTS_FAILURE: 'SCHEMA_INPUTS/GET_SCHEMA_INPUTS_FAILURE',

  CREATE_SCHEMA_INPUT_REQUEST: 'SCHEMA_INPUTS/CREATE_SCHEMA_INPUT_REQUEST',
  CREATE_SCHEMA_INPUT_SUCCESS: 'SCHEMA_INPUTS/CREATE_SCHEMA_INPUT_SUCCESS',
  CREATE_SCHEMA_INPUT_FAILURE: 'SCHEMA_INPUTS/CREATE_SCHEMA_INPUT_FAILURE',

  UPDATE_SCHEMA_INPUT_REQUEST: 'SCHEMA_INPUTS/UPDATE_SCHEMA_INPUT_REQUEST',
  UPDATE_SCHEMA_INPUT_SUCCESS: 'SCHEMA_INPUTS/UPDATE_SCHEMA_INPUT_SUCCESS',
  UPDATE_SCHEMA_INPUT_FAILURE: 'SCHEMA_INPUTS/UPDATE_SCHEMA_INPUT_FAILURE',

  DELETE_SCHEMA_INPUT_REQUEST: 'SCHEMA_INPUTS/DELETE_SCHEMA_INPUT_REQUEST',
  DELETE_SCHEMA_INPUT_SUCCESS: 'SCHEMA_INPUTS/DELETE_SCHEMA_INPUT_SUCCESS',
  DELETE_SCHEMA_INPUT_FAILURE: 'SCHEMA_INPUTS/DELETE_SCHEMA_INPUT_FAILURE'
};

export const initialState: SchemaInputsStateType = {
  schema_inputs: []
};

export const fetchGetSchemaInputs = (screenId: string) => {
  return apiHelper({
    types: [
      types.GET_SCHEMA_INPUTS_REQUEST,
      types.GET_SCHEMA_INPUTS_SUCCESS,
      types.GET_SCHEMA_INPUTS_FAILURE
    ],
    url: `/schema-inputs?screen_id=${screenId}`
  });
};

export const fetchCreateSchemaInput = (data: Partial<SchemaInputType>) => {
  return apiHelper({
    types: [
      types.CREATE_SCHEMA_INPUT_REQUEST,
      types.CREATE_SCHEMA_INPUT_SUCCESS,
      types.CREATE_SCHEMA_INPUT_FAILURE
    ],
    url: '/schema-inputs',
    method: 'POST',
    data
  });
};

export const fetchUpdateSchemaInput = (id: string, data: Partial<SchemaInputType>) => {
  return apiHelper({
    types: [
      types.UPDATE_SCHEMA_INPUT_REQUEST,
      types.UPDATE_SCHEMA_INPUT_SUCCESS,
      types.UPDATE_SCHEMA_INPUT_FAILURE
    ],
    url: `/schema-inputs/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteSchemaInput = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_SCHEMA_INPUT_REQUEST,
      types.DELETE_SCHEMA_INPUT_SUCCESS,
      types.DELETE_SCHEMA_INPUT_FAILURE
    ],
    url: `/schema-inputs/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_SCHEMA_INPUTS_REQUEST:
    case types.CREATE_SCHEMA_INPUT_REQUEST:
    case types.UPDATE_SCHEMA_INPUT_REQUEST:
    case types.DELETE_SCHEMA_INPUT_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_SCHEMA_INPUTS_SUCCESS:
      return { ...state, schema_inputs: action.data?.data?.schema_inputs || [] };

    case types.CREATE_SCHEMA_INPUT_SUCCESS:
      return {
        ...state,
        schema_inputs: [...state.schema_inputs, ...([action.data?.data?.schema_input] || [])]
      };

    case types.UPDATE_SCHEMA_INPUT_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        schema_inputs: state.schema_inputs.map((schema_input) =>
          schema_input.id === (data?.schema_input as SchemaInputType).id
            ? data?.schema_input
            : schema_input
        )
      };
    }

    case types.DELETE_SCHEMA_INPUT_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        schema_inputs: state.schema_inputs.filter(
          (schema_input) => schema_input.id !== (data?.schema_input as SchemaInputType).id
        )
      };
    }

    case types.GET_SCHEMA_INPUTS_FAILURE:
    case types.CREATE_SCHEMA_INPUT_FAILURE:
    case types.UPDATE_SCHEMA_INPUT_FAILURE:
    case types.DELETE_SCHEMA_INPUT_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
