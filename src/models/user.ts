/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-07 23:56:08
 * @Description: load登录、新建孕册modal state
 */

import { Reducer } from 'redux';
// import { stringify } from 'querystring';
// import { router } from 'umi';
import { Effect } from './connect';
import { testApi, bindUser, bindUserMp, newPregnancy, getCaptcha } from '@/services/user';
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
    newPregnancy: Effect;
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
      console.log('响应体信息', response, data, contentType);
      yield put({
        type: 'changeTestData',
        payload: data,
      });
      return data;
    },
    *bindUser({ payload }, { call, put }) {
      const response = yield call(bindUser, payload);
      // console.log('78787878', response);
      // 1.若此接口没有返回值，该用户未曾绑定过
      // 2.如果查到信息，接口返回最近一个档案绑定
      // if (response) {
      //   yield put({
      //     type: 'global/updateState',
      //     payload: {
      //       currentPregnancy: response,
      //     },
      //   });
      // }
      return response;
    },
    *bindUserMp({ payload }, { call, put }) {
      const response = yield call(bindUserMp, payload);
      yield put({
        type: 'global/updateSate',
        payload: {
          currentPregnancy: response,
          mpuid: response.mpuid || response.openId
        },
      });
    },

    *newPregnancy({ payload }, { call, put }) {
      const response = yield call(newPregnancy, payload);
      if (response && response.id) {
        yield put({
          type: 'global/updateState',
          payload: {
            currentPregnancy: response,
            mpuid: response.mpuid || response.openId
          },
        });
        return response;
      }
    },

    *getCaptcha({ payload }, { call }) {
      const res = yield call(getCaptcha, payload);
      return res;
    },
  },

  reducers: {
    changeTestData(state, { payload }) {
      return {
        ...state,
        test: payload,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
