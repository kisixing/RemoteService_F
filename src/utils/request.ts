/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import Router from 'umi/router';
import { Toast } from 'antd-mobile';

const base_url = process.env.NODE_ENV === 'development' ? '' : window.configuration.url;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    if (status === 401) {
      Toast.info('未登录或登录已过期，请重新登录。')
      // @HACK
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({
        type: 'global/logout',
      });
    }
    console.log(`请求错误 ${status}: ${url}, ${errorText}`)
    // environment should not be used
    if (status === 403) {
      // Router.push('/exception/403');
    }
    if (status <= 504 && status >= 500) {
      // Router.push('/exception/500');
    }
    if (status >= 404 && status < 422) {
      // Router.push('/exception/404');
    }
  } else if (!response) {
    console.log('您的网络发生异常，无法连接服务器')
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  timeout: 30000,
  prefix: base_url,
});

/**
 * request interceptor, change url or options.
 */
request.interceptors.request.use((url, options) => {
  let access_token = '';
  const state = window.g_app._store.getState();
  if (state) {
    access_token = state.global.access_token;
  }
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${access_token}`,
    ...options.headers,
  };
  return ({
      url,
      options: {
        ...options,
        interceptors: true,
      },
    }
  );
});

/**
 * response interceptor, chagne response
 * response拦截器, 处理response
 * 每次请求都更新token信息
 */
// request.interceptors.response.use((response, options) => {
//   let token = response.headers.get('Authorization');
//   if (token) {
//     // 修改token值
//     if (token.includes('captcha')) {
//       token = token.replace(/captcha /, '');
//     }
//     store.set('lianmp-token', token);
//   }
//   return response;
// });

export default request;
