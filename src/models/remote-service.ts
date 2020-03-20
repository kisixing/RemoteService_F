/*
 * @Author: ZHONG JUN
 * @Date: 2020-03-20 23:51:07
 * @Description: 远程模块，包括套餐、订单、判图
 */

import { Reducer } from 'redux';
import { Effect, ConnectState } from './connect';
import { getPackages, getProduct } from '@/services/remote-service';

export interface StateType {
  product?: object
  packages?: object
}

export interface NewsModelType {
  namespace: string
  state: StateType
  effects: {
    getProduct: Effect
    getPackages: Effect
  };
  reducers: {
    updateState: Reducer<StateType>;
  };
}

const RemoteServiceModel: NewsModelType = {
  namespace: 'remoteService',

  state: {
    product: {}
  },

  effects: {
    *getPackages({ payload }, { call, put }) {
      const response = yield call(getPackages, payload);
      yield put({
        type: 'updateState',
        payload: {
          packages: response,
        },
      });
    },
    *getProduct({ payload }, { call, put }) {
      const response = yield call(getProduct, payload);
      yield put({
        type: 'updateState',
        payload: {
          product: response,
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

export default RemoteServiceModel;
