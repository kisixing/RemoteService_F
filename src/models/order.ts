import { Reduce } from 'redux';
import { Effect } from '@/models/connect';

export interface OrderStateType {

};

export interface OrderModelType {
  namespace: string,
  state: OrderStateType,
  effects: {},
  reducers: {}
}

const Model: OrderModelType = {
  namespace: 'order',
  state: {},
  effects: {
    
  },
  reducers: {}
}

export default Model;
