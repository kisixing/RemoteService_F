import { resolve } from 'path';
import { IConfig } from 'umi-types';

// 配置路由
import routes from './router.config';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  history: 'browser', // 'hash'部署到非根目录 会有url/#/
  base: '/',
  publicPath: '/',
  hash: true, // 开启 hash 文件后缀
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
  chainWebpack: function(config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 3,
          automaticNameDelimiter: '.',
          name: true,
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
              priority: 20,
            },
            'ant-designs': {
              name: 'ant-designs',
              test: /[\\/]node_modules[\\/](antd|antd-mobile|@ant-design)[\\/]/,
              priority: 20,
            },
            'react-pdf': {
              name: 'react-pdf',
              test: /[\\/]node_modules[\\/](react-pdf\/dist)[\\/]/,
              priority: 20,
            },
            async: {
              chunks: 'async',
              minChunks: 2,
              name: 'async',
              maxInitialRequests: 1,
              minSize: 0,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      },
    });
    // 过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /en_us/];
      });
  },
};

export default config;
