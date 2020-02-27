import { PackageListItem } from '@/pages/order/interface';
// 模拟数据
import { myOrderList, MyOrderPackage } from '../pages/order/config';
/**
 * package重名报错，所有名命为combo
 */
import { Reducer } from 'redux';
import { Effect } from "@/models/connect";

import { getPackage, getPackageData, setPackage } from "@/services/package";

export interface ComboStateType {
  myOrderList: Array<MyOrderPackage>;
  currentPackageDetail: object;
  packageList: Array<PackageListItem>;
}


export interface ComboModelType {
  namespace: string;
  state: ComboStateType,
  effects: {
    getPackage: Effect,
    getPackageData: Effect,
    getMyOrder: Effect,
    setPackage: Effect
  };
  reducers: {
    setMyOrderList: Reducer,
    setCurrentPackageDetail: Reducer,
    setPackageList: Reducer
  };
}

const Model: ComboModelType = {
  namespace: 'combo',
  state: {
    packageList: [],
    currentPackageDetail: {},
    myOrderList: []
  },
  effects: {
    // 获取套餐
    *getPackage({payload}, { call, put}) {
      const { response, data } = yield call(getPackage);
      console.log(response);
      yield put({type: 'setPackageList', payload: data})
    },
    /**
     * 获取套餐
     * @param payload : {id: number} - 传入id用于辨别需要的数据
     * @param call
     * @param put
     */
    *getPackageData({payload}, {call, put}) {
      const { data } = yield call(getPackageData);
      const { id } = payload;
      for(let i = 0; i < data.length ; i++) {
        if(data[i].id === id) {
          yield put({type: 'setCurrentPackageDetail', payload: data[i]});
          break;
        }
      }
    },
    *getMyOrder({payload}, {call,put}) {
      console.log('出发');
      yield put({type: 'setMyOrderList', payload: myOrderList})
    },
    *setPackage({payload}, { call}) {
      yield call(setPackage, payload);
    }
  },
  reducers: {
    setMyOrderList(state,{payload}) {
      state.myOrderList = payload;
      return state;
    },
    setCurrentPackageDetail(state, {payload}) {
      state.currentPackageDetail = payload;
      return state;
    },
    setPackageList(state,{payload}) {
      state.packageList = payload;
      return state
    }
  }
};

export default Model;
