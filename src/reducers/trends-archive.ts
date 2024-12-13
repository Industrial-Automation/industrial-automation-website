import { apiHelper } from 'src/utils';
import { ActionDispatchType } from 'src/store';

export interface TrendsArchiveType {
  id: string;
  screen_id: string;
  title: string;
  value: number;
  tag: string;
  created_at: string;
  last_updated_at: string;
}

export interface TrendsArchiveStateType {
  trends_archive: TrendsArchiveType[];
}

export const types = {
  GET_TRENDS_ARCHIVE_REQUEST: 'TRENDS_ARCHIVE/GET_TRENDS_ARCHIVE_REQUEST',
  GET_TRENDS_ARCHIVE_SUCCESS: 'TRENDS_ARCHIVE/GET_TRENDS_ARCHIVE_SUCCESS',
  GET_TRENDS_ARCHIVE_FAILURE: 'TRENDS_ARCHIVE/GET_TRENDS_ARCHIVE_FAILURE'
};

export const initialState: TrendsArchiveStateType = {
  trends_archive: []
};

export const fetchGetTrendsArchive = (screenId: string) => {
  return apiHelper({
    types: [
      types.GET_TRENDS_ARCHIVE_REQUEST,
      types.GET_TRENDS_ARCHIVE_SUCCESS,
      types.GET_TRENDS_ARCHIVE_FAILURE
    ],
    url: `/trends-archive?screen_id=${screenId}`
  });
};

export default function (state = initialState, action: ActionDispatchType) {
  switch (action.type) {
    case types.GET_TRENDS_ARCHIVE_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.GET_TRENDS_ARCHIVE_SUCCESS:
      return { ...state, trends_archive: action.data?.data?.trends_archive || [] };

    case types.GET_TRENDS_ARCHIVE_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    default:
      return state;
  }
}
