import { Reducer } from 'redux';
import { Effect } from './connect';
import { mpauth, getPregnancy, updatePregnancy } from '@/services/user';


export interface GlobalModelState {
  locale?: string;
  hospital?: string;
  mpuid?: string;
  access_token?: string;
  currentPregnancy?: {
    id?: string | number;
    mpuid?: string
    [propName: string]: any;
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
    hospital: '',
    mpuid: '',
    access_token: '',
    currentPregnancy: {},
    // mpuid: 'oONcg1d-i8OrskBrnOndjMpct0TM',
    // access_token:
    //   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtbG9naW5fcHJlZ19vT05jZzFkLWk4T3Jza0Jybk9uZGpNcGN0MFRNIiwiYXV0aCI6IlJPTEVfUFJFRyIsImV4cCI6MTU5MzE0MjcyNX0.hhzN1sxAXM7ETk0mNZSnzUw2ExIBgQ7vYmuYNS6R7AzIm7abqUTIT4xuWHbrYBICq9BrCox5lWN6RiGIxq0wbQ',
    // currentPregnancy: { id: 101 },
    // mpuid: 'oH2RO1T1RYbCtBeXqrTvcbSRdVEI',
    // access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtbG9naW5fcHJlZ19vSDJSTzFUMVJZYkN0QmVYcXJUdmNiU1JkVkVJIiwiYXV0aCI6IlJPTEVfUFJFRyIsImV4cCI6MTU5NDE5MTI3MX0.8ILN_5fmT0QOQSmqfaAJ37YBx71YJL-uw8utQFjMQNpvvRVovAukXfUjNi99VcqOwXBrCZhqBAU6tO32lVSv_A',
    // currentPregnancy: { id: 153 },
  },

  effects: {
    // 微信跳转验证
    *mpauth({ payload }, { call, put }) {
      try {
        const { response, data } = yield call(mpauth, payload);
        //  已在request封装处理
        // 在响应体获取token，保存到session storage
        let token = response && response.headers.get('Authorization');
        if (token) {
          const access_token = token.replace(/captcha /, '');
          yield put({
            type: 'updateState',
            payload: {
              access_token,
            },
          });
        }
        if (data && data.mpuid) {
          yield put({
            type: 'updateState',
            payload: {
              currentPregnancy: data,
              mpuid: data.mpuid || response.openId,
              hospital: data && data.organization && data.organization.name,
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
          hospital: data && data.organization && data.organization.name,
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
