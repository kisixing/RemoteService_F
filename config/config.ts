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
  base: process.env.NODE_ENV === 'development' ? '/' : '/H5/',
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/H5/',
  outputPath: './dist/H5',
  hash: true, // 开启 hash 文件后缀
  routes: routes,
  minimizer: 'terserjs',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
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
        chunks: ['vendors', 'umi'],
        headScripts: [
          // { src: 'https://cdn.bootcss.com/react/16.12.0/umd/react.production.min.js' },
          // { src: 'https://cdn.bootcss.com/react-dom/16.12.0/umd/react-dom.production.min.js' },
          { src: `<%= PUBLIC_PATH %>config.js?timestamp=${new Date().getTime()}` },
        ],
        // scripts: [{ src: '<%= PUBLIC_PATH %>config.js' }],
        links: [
          { rel: 'stylesheet', href: '<%= PUBLIC_PATH %>loaders.min.css' },
          { rel: 'stylesheet', href: '<%= PUBLIC_PATH %>iconfont/iconfont.css' },
        ],
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
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  extraBabelPlugins: [
    ['import', { libraryName: 'antd-mobile', style: true }], // 按需加载antd-mobile样式文件
  ],
  proxy: {
    '/api': {
      target: 'http://hdrm.lian-med.com:9989/', // 'http://transfer.lian-med.com:9987/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
    '/mock/api': {
      target: 'http://localhost:3001/',
      changeOrigin: false,
      // pathRewrite: { '^/mock/api': '' },
    },
  },
  alias: {
    '@': resolve(__dirname, './src'),
  },
  copy: [
    {
      from: 'node_modules/pdfjs-dist/cmaps/',
      to: 'cmaps/',
    },
  ],
  externals: {
    // react: 'window.React',
    // 'react-dom': 'window.ReactDOM',
    // moment: 'window.moment',
  },
  chainWebpack: process.env.NODE_ENV === 'development' ? undefined : webpackPlugin,
  uglifyJSOptions: {
    parallel: true,
  },
  autoprefixer: {
    flexbox: true
  },
  targets: {
    ie: 9,
    ios: 9,
    safari: 9
  },
  browserslist: [
    '> 1%',
    'last 2 versions',
    'ios 8'
  ],
};

export default config;
