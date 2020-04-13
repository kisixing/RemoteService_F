import * as IWebpackChainConfig from 'webpack-chain';

const webpackPlugin = (config: IWebpackChainConfig, { webpack }) => {
  config.merge({
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 3,
        automaticNameDelimiter: '.',
        cacheGroups: {
          react: {
            name: 'react',
            priority: 20,
            test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
          },
          antd: {
            name: 'antd',
            priority: 20,
            test: /[\\/]node_modules[\\/](antd|@ant-design\/icons|@ant-design\/compatible|antd-mobile)[\\/]/,
          },
          'react-pdf': {
            name: 'react-pdf',
            priority: 20,
            test: /[\\/]node_modules[\\/](react-pdf\/dist|pdfjs-dist)[\\/]/,
          },
          'chart-js': {
            name: 'chart-js',
            priority: 20,
            test: /[\\/]node_modules[\\/](chart.js\/dist)[\\/]/,
          },
          'china-division': {
            name: 'china-division',
            priority: 20,
            test: /[\\/]node_modules[\\/](china-division)[\\/]/,
          },
          async: {
            chunks: 'async',
            minChunks: 5,
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
};

export default webpackPlugin;
