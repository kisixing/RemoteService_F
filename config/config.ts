import { resolve } from 'path';
import { IConfig } from 'umi-types';

// 配置路由
import routes from './router.config';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'hash', // 部署 html 到非根目录 会有url/#/
  routes: routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ["import", { libraryName: "antd-mobile", style: "css" }],
    [
      'umi-plugin-react',
      {
        // antd: true,
        dva: true,
        dynamicImport: {
          loadingComponent: './components/Loader/index',
          webpackChunkName: true,
          level: 3,
        }, // 按需加载
        hd: true,
        fastClick: true,
        title: 'Lianmp_FontEnd',
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
      to: 'public/pdfjs-dist/libs/',
    },
    {
      from: 'node_modules/pdfjs-dist/cmaps/',
      to: 'public/pdfjs-dist/cmaps/',
    },
  ],
};

export default config;
