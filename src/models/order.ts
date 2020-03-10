import { Reduce } from 'redux';
import { Effect } from '@/models/connect';
import { OrderState } from '@/pages/remote-service/order/config';
export interface OrderStateType {
  orderList: Array<any>,
  currentOrder: number|string
};

export interface OrderModelType {
  namespace: string,
  state: OrderStateType,
  effects: {},
  reducers: {}
}

const Model: OrderModelType = {
  namespace: 'order',
  state: {
    orderList: [],
    currentOrder: -1
  },
  effects: {
    
  },
  reducers: {}
}

export default Model;
