/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-07 23:56:08
 * @Description: load登录、新建孕册modal state
 */

import { Reducer } from 'redux';
// import { stringify } from 'querystring';
// import { router } from 'umi';
import { Effect } from './connect';
import { mpauth, bindUser, bindUserMp, addYc, getCaptcha } from '@/services/user';
// import { getPageQuery } from "@/utils/getPageQuery";

export interface StateType {
  isLogin?: boolean;
  currentUser?: any;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    mpauth: Effect;
    bindUser: Effect;
    bindUserMp: Effect;
    getCaptcha: Effect;
    addYc: Effect
  };
  reducers: {
    changeUserStatus: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'user',

  state: {
    isLogin: false,
    currentUser: {}
  },

  effects: {
    *mpauth({ payload, callback }, { call, put }) {
      const response = yield call(mpauth, payload);
      yield put({
        type: 'changeUserStatus',
        payload: response,
      });
      if (callback) callback(response)
    },

    *bindUser({ payload }, { call, put }) {
      const response = yield call(bindUser, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    *bindUserMp({ payload }, { call, put }) {
      const response = yield call(bindUserMp, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    *addYc({ payload }, { call }) {
      yield call(getCaptcha, payload);
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getCaptcha, payload);
    }
  },

  reducers: {
    changeUserStatus(state, { payload }) {
      return {
        ...state,
        isLogin: !!payload.id,
        currentUser: payload,
      };
    },
  },
};

export default Model;
