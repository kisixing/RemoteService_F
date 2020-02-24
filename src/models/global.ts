import { Reducer } from 'redux';
import { Effect } from './connect';
// import { ConnectState } from './connect.d';
import { mpauth } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  userid?: string;
}
export interface GlobalModelState {
  isLogin: boolean,
  currentUser?: CurrentUser,
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    mpauth: Effect;
  };
  reducers: {
    changeUserStatus: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: any };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    isLogin: false,
    currentUser: {},
  },

  effects: {
    *mpauth({ payload }, { call, put }) {
      const response = yield call(mpauth, payload);
      yield put({
        type: 'changeUserStatus',
        payload: response,
      });
    },
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

  subscriptions: {
    setup({ history }: any): void {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }: any): void => {
        if (typeof window['ga'] !== 'undefined') {
          window['ga']('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
