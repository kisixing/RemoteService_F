import { PackageListItem } from '@/pages/order/interface';
// 模拟数据
import { MyOrderPackage } from '../pages/order/config';
/**
 * package重名报错，所有名命为combo
 */
import { Reducer } from 'redux';
import { Effect } from "@/models/connect";

import { getPackage, getPackageData, setPackage } from "@/services/package";

export interface ComboStateType {
  currentPackageDetail: object;
  packageList: Array<PackageListItem>;
  currentPackageId: string|number;
}


export interface ComboModelType {
  namespace: string,
  state: ComboStateType,
  effects: {
    getPackage: Effect,
    getPackageData: Effect,
    setPackage: Effect
  };
  reducers: {
    setCurrentPackageDetail: Reducer,
    setPackageList: Reducer,
    setPackageId: Reducer
  };
}

const Model: ComboModelType = {
  namespace: 'combo',
  state: {
    packageList: [],
    currentPackageDetail: {},
    currentPackageId: -1    // -1是为空值
  },
  effects: {
    // 获取套餐
    *getPackage({payload}, { call, put}) {
      const { response, data } = yield call(getPackage);
      console.log(response);
      yield put({type: 'setPackageList', payload: data})
    },
    /**
     * 获取套餐详细信息
     * @param payload : {id: number} - 传入id用于辨别需要的数据
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
    *setPackage({payload}, { call}) {
      yield call(setPackage, payload);
    }
  },
  reducers: {
    setCurrentPackageDetail(state, {payload}) {
      state.currentPackageDetail = payload;
      return state;
    },
    setPackageList(state,{payload}) {
      state.packageList = payload;
      return state
    },
    // payload 传入id:number|string
    setPackageId(state, {payload}) {
      state.currentPackageId = payload;
      return state
    }
  }
};

export default Model;
