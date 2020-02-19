/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-18 21:36:39
 * @Description:
 */
import { Reducer } from 'redux';
import { Effect, ConnectState } from './connect';
// import { ConnectState } from './connect.d';
import { getNews } from '@/services/news';

export interface StateType {
  personal?: any[],
  article?: any[],
  video?: any[]
}

export interface NewsModelType {
  namespace: 'news';
  state: StateType;
  effects: {
    getPersonNews: Effect;
  };
  reducers: {
    changeNewsStatus: Reducer<StateType>;
  };
}

const NewsModel: NewsModelType = {
  namespace: 'news',

  state: {
    personal: [],
    article: [],
    video: []
  },

  effects: {
    *getPersonNews({ payload }, { call, put }) {
      const params = {
        type: 'personal',
        query: payload
      }
      const response = yield call(getNews, params);
      yield put({
        type: 'changeNewsStatus',
        payload: {
          type: 'personal',
          data: response.data
        },
      });
    },
  },

  reducers: {
    changeNewsStatus(state, { payload }) {
      const { type, data } = payload;
      return {
        [type]: data
      };
    },
  },
};

export default NewsModel;
