import { resolve } from 'path';
import { IConfig } from 'umi-types';

// webpack
import webpackPlugin from './plugin.config';
// 配置路由
import routes from './router.config';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'browser', // 'hash'部署到非根目录 会有url/#/
  base: '/',
  publicPath: '/',
  // hash: true, // 开启 hash 文件后缀
  routes: routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/Loader/index',
          webpackChunkName: true,
          level: 3,
        }, // 按需加载
        hd: true,
        fastClick: true,
        title: '围产保健',
        dll: true,
        locale: {
          enable: true,
          default: 'zh-CN',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  theme: {
    '@primary-color': '#FFBE2D',
    '@brand-primary': '#FFBE2D',
    '@brand-primary-tap': '#FFE672',
  },
  proxy: {
    '/api': {
      target: 'http://transfer.lian-med.com/',
      changeOrigin: false,
      // pathRewrite: { '^/api': '/api' },
    },
    '/mock/api': {
      target: 'http://localhost:3001/',
      changeOrigin: false,
      // pathRewrite: { '^/mock/api': '' },
    },
    '/test/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/test/api': '' },
    },
  },
  alias: {
    '@': resolve(__dirname, './src'),
  },
  copy: [
    {
      from: 'node_modules/pdfjs-dist/build/',
      to: 'pdfjs-dist/libs/',
    },
    {
      from: 'node_modules/pdfjs-dist/cmaps/',
      to: 'pdfjs-dist/cmaps/',
    },
  ],
  chainWebpack: webpackPlugin
};

export default config;
