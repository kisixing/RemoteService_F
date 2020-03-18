import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { getPackageOrders, getServiceOrders } from '@/services/order';
import { PackageOrderItem, ServiceOrderItem } from '@/pages/remote-service/order/interface';
export interface OrderStateType {
  serviceOrderList: Array<ServiceOrderItem>,
  packageOrderList: Array<PackageOrderItem>,
  currentOrder: number | string
};

export interface OrderModelType {
  namespace: string,
  state: OrderStateType,
  effects: {
    getPackageOrders: Effect,
    getServiceOrders: Effect
  },
  reducers: {
    setPackageOrderList: Reducer,
    setServiceOrderList: Reducer,
  }
}

const Model: OrderModelType = {
  namespace: 'order',
  state: {
    packageOrderList: [],
    serviceOrderList: [],
    currentOrder: -1
  },
  effects: {
    *getPackageOrders({ payload }, { put, call }) {
      const { data, response } = yield call(getPackageOrders, payload);
      console.log(data);
      console.log(response);
      yield put({ type: 'setPackageOrderList', payload: data });
    },
    *getServiceOrders({ payload }, { put, call }) {
      const { data, response } = yield call(getServiceOrders, payload);
      console.log(data);
      console.log(response);
      yield put({type: 'setServiceOrderList', payload:data});
    }
  },
  reducers: {
    setPackageOrderList(state, { payload }) {
      let newState = JSON.parse(JSON.stringify(state));
      newState.packageOrderList = payload;
      return newState;
    },
    setServiceOrderList(state, { payload }) {
      let newState = JSON.parse(JSON.stringify(state));
      newState.serviceOrderList = payload;
      return newState;
    },
  }
}

export default Model;
