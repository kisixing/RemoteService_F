import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { getPackageOrders, getServiceOrders } from '@/services/order';
import { PackageOrderItem, ServiceOrderItem } from '@/pages/remote-service/order/interface';
export interface OrderStateType {
  serviceOrderList: Array<ServiceOrderItem>,
  packageOrderList: Array<PackageOrderItem>,
  currentOrder: PackageOrderItem|ServiceOrderItem|null
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
    setCurrentOrder: Reducer
  }
}

const Model: OrderModelType = {
  namespace: 'order',
  state: {
    packageOrderList: [],
    serviceOrderList: [],
    currentOrder: null
  },
  effects: {
    *getPackageOrders({ payload }, { put, call }) {
      const { data } = yield call(getPackageOrders, payload);
      yield put({ type: 'setPackageOrderList', payload: data });
    },
    *getServiceOrders({ payload }, { put, call }) {
      const { data } = yield call(getServiceOrders, payload);
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
    setCurrentOrder(state, {payload}) {
      let newState = JSON.parse(JSON.stringify(state));
      newState.currentOrder = payload;
      return newState;
    }
  }
}

export default Model;
