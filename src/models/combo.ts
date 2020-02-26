// 模拟数据
import { myOrderList, MyOrderPackage } from '../pages/order/config';
/**
 * package重名报错，所有名命为combo
 */
import { Reducer } from 'redux';
import { Effect } from "@/models/connect";

import { getPackage } from "@/services/package";

export interface ComboStateType {
  myOrderList: Array<MyOrderPackage>
}


export interface ComboModelType {
  namespace: string;
  state: ComboStateType,
  effects: {
    getPackage: Effect,
    getMyOrder: Effect
  };
  reducers: {
    setMyOrderList: Reducer
  };
}

const Model: ComboModelType = {
  namespace: 'combo',
  state: {
    myOrderList: []
  },
  effects: {
    // 获取套餐
    *getPackage({payload}, { call, put}) {
      const { response, data } = yield call(getPackage);
      console.log(response);
      console.log(data);
    },
    *getMyOrder({payload}, {call,put}) {
      console.log('出发');
      yield put({type: 'setMyOrderList', payload: myOrderList})
    }
  },
  reducers: {
    setMyOrderList(state,{payload}) {
      state.myOrderList = payload;
      return state;
    }
  }

};

export default Model;
