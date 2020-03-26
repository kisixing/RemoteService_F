import { Reducer } from 'redux';
import { Effect } from './connect';
// import { ConnectState } from './connect.d';
import { mpauth, getPregnancy } from '@/services/user';


export interface GlobalModelState {
  locale?: string
  access_token?: string
  mpuid?: string
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
  };
  reducers: {
    updatePregnancy: Reducer<GlobalModelState>;
    updateState: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: any };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  // 开发时，写死自己的mpuid和access_token
  state: {
    locale: 'cn', // cn/en
    access_token: '',
    mpuid: '',
    currentPregnancy: {},
  },

  effects: {
    // 微信跳转验证
    *mpauth({ payload }, { call, put }) {
      try {
        const { response, data } = yield call(mpauth, payload);
        //  已在request封装处理
        const token = response && response.headers.get('Authorization');
        if (token) {
          const access_token = token.replace(/captcha /, '');
          sessionStorage.setItem('access_token', access_token);
          yield put({
            type: 'updateState',
            payload: {
              access_token,
            },
          });
        }
        if (data && data.id) {
          yield put({
            type: 'updatePregnancy',
            payload: data,
          });
          return data;
        }
        if (data && data.mpuid) {
          // 不管是否已经建档，都保存openid
          yield put({
            type: 'updateState',
            payload: {
              mpuid: data.mpuid,
            },
          });
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
  },

  reducers: {
    updatePregnancy(state, { payload }) {
      return {
        ...state,
        mpuid: payload.mpuid || payload.openid,
        currentPregnancy: payload,
      };
    },
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
