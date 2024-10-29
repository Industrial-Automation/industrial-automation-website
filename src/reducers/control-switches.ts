import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface ControlSwitchType {
  id: string;
  screen_id: string;
  value: boolean;
  title: string;
  description: string | null;
  tag: string;
  editable: boolean;
  created_at: string;
  last_updated_at: string;
}

export interface ControlSwitchesStateType {
  control_switches: ControlSwitchType[];
}

export const types = {
  GET_CONTROL_SWITCHES_REQUEST: 'CONTROL_SWITCHES/GET_CONTROL_SWITCHES_REQUEST',
  GET_CONTROL_SWITCHES_SUCCESS: 'CONTROL_SWITCHES/GET_CONTROL_SWITCHES_SUCCESS',
  GET_CONTROL_SWITCHES_FAILURE: 'CONTROL_SWITCHES/GET_CONTROL_SWITCHES_FAILURE',

  CREATE_CONTROL_SWITCH_REQUEST: 'CONTROL_SWITCHES/CREATE_CONTROL_SWITCH_REQUEST',
  CREATE_CONTROL_SWITCH_SUCCESS: 'CONTROL_SWITCHES/CREATE_CONTROL_SWITCH_SUCCESS',
  CREATE_CONTROL_SWITCH_FAILURE: 'CONTROL_SWITCHES/CREATE_CONTROL_SWITCH_FAILURE',

  UPDATE_CONTROL_SWITCH_REQUEST: 'CONTROL_SWITCHES/UPDATE_CONTROL_SWITCH_REQUEST',
  UPDATE_CONTROL_SWITCH_SUCCESS: 'CONTROL_SWITCHES/UPDATE_CONTROL_SWITCH_SUCCESS',
  UPDATE_CONTROL_SWITCH_FAILURE: 'CONTROL_SWITCHES/UPDATE_CONTROL_SWITCH_FAILURE',

  DELETE_CONTROL_SWITCH_REQUEST: 'CONTROL_SWITCHES/DELETE_CONTROL_SWITCH_REQUEST',
  DELETE_CONTROL_SWITCH_SUCCESS: 'CONTROL_SWITCHES/DELETE_CONTROL_SWITCH_SUCCESS',
  DELETE_CONTROL_SWITCH_FAILURE: 'CONTROL_SWITCHES/DELETE_CONTROL_SWITCH_FAILURE'
};

export const initialState: ControlSwitchesStateType = {
  control_switches: []
};

export const fetchGetControlSwitches = (screenId: string) => {
  return apiHelper({
    types: [
      types.GET_CONTROL_SWITCHES_REQUEST,
      types.GET_CONTROL_SWITCHES_SUCCESS,
      types.GET_CONTROL_SWITCHES_FAILURE
    ],
    url: `/control-switches?screen_id=${screenId}`
  });
};

export const fetchCreateControlSwitch = (data: Partial<ControlSwitchType>) => {
  return apiHelper({
    types: [
      types.CREATE_CONTROL_SWITCH_REQUEST,
      types.CREATE_CONTROL_SWITCH_SUCCESS,
      types.CREATE_CONTROL_SWITCH_FAILURE
    ],
    url: '/control-switches',
    method: 'POST',
    data
  });
};

export const fetchUpdateControlSwitch = (id: string, data: Partial<ControlSwitchType>) => {
  return apiHelper({
    types: [
      types.UPDATE_CONTROL_SWITCH_REQUEST,
      types.UPDATE_CONTROL_SWITCH_SUCCESS,
      types.UPDATE_CONTROL_SWITCH_FAILURE
    ],
    url: `/control-switches/${id}`,
    method: 'PATCH',
    data
  });
};

export const fetchDeleteControlSwitch = (id: string) => {
  return apiHelper({
    types: [
      types.DELETE_CONTROL_SWITCH_REQUEST,
      types.DELETE_CONTROL_SWITCH_SUCCESS,
      types.DELETE_CONTROL_SWITCH_FAILURE
    ],
    url: `/control-switches/${id}`,
    method: 'DELETE'
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_CONTROL_SWITCHES_REQUEST:
    case types.CREATE_CONTROL_SWITCH_REQUEST:
    case types.UPDATE_CONTROL_SWITCH_REQUEST:
    case types.DELETE_CONTROL_SWITCH_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_CONTROL_SWITCHES_SUCCESS:
      return { ...state, control_switches: action.data?.data?.control_switches || [] };

    case types.CREATE_CONTROL_SWITCH_SUCCESS:
      return {
        ...state,
        control_switches: [
          ...state.control_switches,
          ...([action.data?.data?.control_switch] || [])
        ]
      };

    case types.UPDATE_CONTROL_SWITCH_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        control_switches: state.control_switches.map((control_switch) =>
          control_switch.id === (data?.control_switch as ControlSwitchType).id
            ? data?.control_switch
            : control_switch
        )
      };
    }

    case types.DELETE_CONTROL_SWITCH_SUCCESS: {
      const data = action.data?.data;

      return {
        ...state,
        control_switches: state.control_switches.filter(
          (control_switch) => control_switch.id !== (data?.control_switch as ControlSwitchType).id
        )
      };
    }

    case types.GET_CONTROL_SWITCHES_FAILURE:
    case types.CREATE_CONTROL_SWITCH_FAILURE:
    case types.UPDATE_CONTROL_SWITCH_FAILURE:
    case types.DELETE_CONTROL_SWITCH_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
