import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface ControlGaugeType {
  id: string;
  screen_id: string;
  title: string;
  description: string | null;
  value: number;
  min_value: number;
  max_value: number;
  interval_value: number;
  unit: string;
  editable: boolean;
  created_at: string;
  last_updated_at: string;
}

export interface ControlGaugesStateType {
  control_gauges: ControlGaugeType[];
}

export const types = {
  GET_CONTROL_GAUGES_REQUEST: 'CONTROL_GAUGES/GET_CONTROL_GAUGES_REQUEST',
  GET_CONTROL_GAUGES_SUCCESS: 'CONTROL_GAUGES/GET_CONTROL_GAUGES_SUCCESS',
  GET_CONTROL_GAUGES_FAILURE: 'CONTROL_GAUGES/GET_CONTROL_GAUGES_FAILURE',

  CREATE_CONTROL_GAUGE_REQUEST: 'CONTROL_GAUGES/CREATE_CONTROL_GAUGE_REQUEST',
  CREATE_CONTROL_GAUGE_SUCCESS: 'CONTROL_GAUGES/CREATE_CONTROL_GAUGE_SUCCESS',
  CREATE_CONTROL_GAUGE_FAILURE: 'CONTROL_GAUGES/CREATE_CONTROL_GAUGE_FAILURE',

  UPDATE_CONTROL_GAUGE_REQUEST: 'CONTROL_GAUGES/UPDATE_CONTROL_GAUGE_REQUEST',
  UPDATE_CONTROL_GAUGE_SUCCESS: 'CONTROL_GAUGES/UPDATE_CONTROL_GAUGE_SUCCESS',
  UPDATE_CONTROL_GAUGE_FAILURE: 'CONTROL_GAUGES/UPDATE_CONTROL_GAUGE_FAILURE',

  DELETE_CONTROL_GAUGE_REQUEST: 'CONTROL_GAUGES/DELETE_CONTROL_GAUGE_REQUEST',
  DELETE_CONTROL_GAUGE_SUCCESS: 'CONTROL_GAUGES/DELETE_CONTROL_GAUGE_SUCCESS',
  DELETE_CONTROL_GAUGE_FAILURE: 'CONTROL_GAUGES/DELETE_CONTROL_GAUGE_FAILURE'
};

export const initialState: ControlGaugesStateType = {
  control_gauges: []
};

export const fetchGetControlGauges = (screenId: string) => {
  return apiHelper({
    types: [
      types.GET_CONTROL_GAUGES_REQUEST,
      types.GET_CONTROL_GAUGES_SUCCESS,
      types.GET_CONTROL_GAUGES_FAILURE
    ],
    url: `/control-gauges?screen_id=${screenId}`
  });
};

export const fetchCreateControlGauge = (data: Partial<ControlGaugeType>) => {
  return apiHelper({
    types: [
      types.CREATE_CONTROL_GAUGE_REQUEST,
      types.CREATE_CONTROL_GAUGE_SUCCESS,
      types.CREATE_CONTROL_GAUGE_FAILURE
    ],
    url: '/control-gauges',
    method: 'POST',
    data
  });
};

export const fetchUpdateControlGauge = (id: string, data: Partial<ControlGaugeType>) => {
  return apiHelper({
    types: [
      types.UPDATE_CONTROL_GAUGE_REQUEST,
      types.UPDATE_CONTROL_GAUGE_SUCCESS,
      types.UPDATE_CONTROL_GAUGE_FAILURE
    ],
    url: `/control-gauges/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteControlGauge = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_CONTROL_GAUGE_REQUEST,
      types.DELETE_CONTROL_GAUGE_SUCCESS,
      types.DELETE_CONTROL_GAUGE_FAILURE
    ],
    url: `/control-gauges/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_CONTROL_GAUGES_REQUEST:
    case types.CREATE_CONTROL_GAUGE_REQUEST:
    case types.UPDATE_CONTROL_GAUGE_REQUEST:
    case types.DELETE_CONTROL_GAUGE_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_CONTROL_GAUGES_SUCCESS:
      return { ...state, control_gauges: action.data?.data?.control_gauges || [] };

    case types.CREATE_CONTROL_GAUGE_SUCCESS:
      return {
        ...state,
        control_gauges: [...state.control_gauges, ...([action.data?.data?.control_gauge] || [])]
      };

    case types.UPDATE_CONTROL_GAUGE_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        control_gauges: state.control_gauges.map((control_gauge) =>
          control_gauge.id === (data?.control_gauge as ControlGaugeType).id
            ? data?.control_gauge
            : control_gauge
        )
      };
    }

    case types.DELETE_CONTROL_GAUGE_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        control_gauges: state.control_gauges.filter(
          (control_gauge) => control_gauge.id !== (data?.control_gauge as ControlGaugeType).id
        )
      };
    }

    case types.GET_CONTROL_GAUGES_FAILURE:
    case types.CREATE_CONTROL_GAUGE_FAILURE:
    case types.UPDATE_CONTROL_GAUGE_FAILURE:
    case types.DELETE_CONTROL_GAUGE_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
