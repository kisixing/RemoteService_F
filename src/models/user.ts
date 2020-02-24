/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-07 23:56:08
 * @Description: load登录、新建孕册modal state
 */

import { Reducer } from 'redux';
// import { stringify } from 'querystring';
// import { router } from 'umi';
import { Effect } from './connect';
import { testApi, bindUser, bindUserMp, addYc, getCaptcha } from '@/services/user';
// import { getPageQuery } from "@/utils/getPageQuery";

export interface StateType {}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    test: Effect;
    bindUser: Effect;
    bindUserMp: Effect;
    getCaptcha: Effect;
    addYc: Effect;
  };
  reducers: {
    updateState: Reducer<StateType>;
    changeTestData: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'user',

  state: {},

  effects: {
    *test({ payload }, { call, put }) {
      const { response, data } = yield call(testApi, payload);
      // 响应体信息
      const contentType = response.headers.get('Content-Type');
      console.log('响应体信息', response, contentType);
      yield put({
        type: 'changeTestData',
        payload: data
      });
      return data;
    },
    *bindUser({ payload }, { call, put }) {
      const response = yield call(bindUser, payload);
      yield put({
        type: 'updateState',
        payload: response,
      });
      return response;
    },

    *bindUserMp({ payload }, { call, put }) {
      const response = yield call(bindUserMp, payload);
      yield put({
        type: 'updateState',
        payload: response,
      });
    },

    *addYc({ payload }, { call }) {
      yield call(getCaptcha, payload);
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getCaptcha, payload);
    },
  },

  reducers: {
    changeTestData(state, { payload }) {
      return {
        ...state,
        test: payload
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
};

export default Model;
