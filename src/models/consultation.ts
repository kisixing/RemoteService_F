import { Reducer } from 'redux';
import { Effect, ConnectState } from './connect';
// import { ConnectState } from './connect.d';
import { getDoctors, getComments } from '@/services/remote-service';

export interface StateType {
  doctors?: any[];
  comments: any[];
}

export interface NewsModelType {
  namespace: string;
  state: StateType;
  effects: {
    getDoctors: Effect;
    getComments: Effect;
  };
  reducers: {
    updateState: Reducer<StateType>;
  };
}

const ConsultationModel: NewsModelType = {
  namespace: 'consultation',

  state: {
    doctors: [],
    comments: []
  },

  effects: {
    *getDoctors({ payload }, { call, put }) {
      const response = yield call(getDoctors, payload);
      yield put({
        type: 'updateState',
        payload: {
          doctors: response ? response.data : [],
        },
      });
      return response.data || []
    },
    *getComments({ payload }, { call, put }) {
      const response = yield call(getComments, payload);
      yield put({
        type: 'updateState',
        payload: {
          comments: response ? response.data : [],
        },
      });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default ConsultationModel;
