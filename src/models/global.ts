import { Reducer } from 'redux';
import store from 'store';
import { Effect } from './connect';
// import { ConnectState } from './connect.d';
import { mpauth, getPregnancy, updatePregnancy } from '@/services/user';


export interface GlobalModelState {
  locale?: string;
  mpuid?: string;
  access_token?: string,
  currentPregnancy?: {
    id?: string | number
    [propName: string]: any
  };
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    mpauth: Effect;
    getPregnancy: Effect;
    updatePregnancy: Effect;
  };
  reducers: {
    updateState: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: any };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    locale: 'cn', // cn/en
    mpuid: '',
    access_token: '',
    currentPregnancy: {},
  },

  effects: {
    // 微信跳转验证
    *mpauth({ payload }, { call, put }) {
      try {
        const { response, data } = yield call(mpauth, payload);
        //  已在request封装处理
        let token = response && response.headers.get('Authorization');
        if (token) {
          const access_token = token.replace(/captcha /, '');
          // sessionStorage.setItem('access_token', access_token);
          yield put({
            type: 'updateState',
            payload: {
              access_token,
            },
          });
        }
        if (data && data.id) {
          store.set('mpuid', data.mpuid);
          yield put({
            type: 'updateState',
            payload: {
              currentPregnancy: data,
              mpuid: data.mpuid || response.openId,
            },
          });
          return data;
        }
      } catch (error) {
        console.log('on error', error);
      }
    },
    *getPregnancy({ payload }, { call, put }) {
      const data = yield call(getPregnancy, payload);
      yield put({
        type: 'updateState',
        payload: {
          currentPregnancy: data,
        },
      });
      return data;
    },
    *updatePregnancy({ payload }, { call, put, select }) {
      const id = yield select(_ => _.global.currentPregnancy.id);
      const values = { id, ...payload };
      const response = yield call(updatePregnancy, values);
      yield put({
        type: 'updateState',
        payload: {
          currentPregnancy: response,
        },
      });
      return response;
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

  subscriptions: {
    setup({ dispatch, history }: any): void {
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
