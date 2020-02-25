import { Reducer } from 'redux';
// import store from 'store';
import { Effect } from './connect';
// import { ConnectState } from './connect.d';
import { mpauth } from '@/services/user';

export interface GlobalModelState {
  mpuid?: string
  currentUser?: any
  currentPregnancy?: any
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    mpauth: Effect;
  };
  reducers: {
    changeUserStatus: Reducer<GlobalModelState>;
    updateState: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: any };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    mpuid: '',
    currentUser: {},
    currentPregnancy: {},
  },

  effects: {
    // 微信跳转验证
    *mpauth({ payload }, { call, put }) {
      try {
        const { /* response, */ data } = yield call(mpauth, payload);
        //  已在request封装处理
        // let token = response && response.headers.get('Authorization');
        // if (token) {
        //   token = token.replace(/captcha/, 'Bearer');
        //   store.set('lianmp-token', token);
        // }
        if (data) {
          yield put({
            type: 'changeUserStatus',
            payload: data,
          });
          return data;
        }
      } catch (error) {
        console.log('on error', error);
      }
    },
  },

  reducers: {
    changeUserStatus(state, { payload }) {
      return {
        ...state,
        mpuid: payload.mpuid || payload.openid,
        currentUser: payload,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
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
