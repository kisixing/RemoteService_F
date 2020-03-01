import * as IWebpackChainConfig from 'webpack-chain';

const webpackPlugin = (config: IWebpackChainConfig) => {
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
            test: /[\\/]node_modules[\\/](antd|@ant-design\/icons|@ant-design\/compatible|antd-mobile\/es)[\\/]/,
          },
          'react-pdf': {
            name: 'react-pdf',
            priority: 20,
            test: /[\\/]node_modules[\\/](react-pdf\/dist)[\\/]/,
          },
          'pdfjs-dist': {
            name: 'pdfjs-dist',
            priority: 20,
            test: /[\\/]node_modules[\\/]pdfjs-dist[\\/]/,
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
  })
};

export default webpackPlugin;
