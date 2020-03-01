import * as IWebpackChainConfig from 'webpack-chain';

const webpackPlugin = (config: IWebpackChainConfig) => {
  config.merge({
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
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
            test: /[\\/]node_modules[\\/](antd|@ant-design|antd-mobile)[\\/]/,
          },
          'react-pdf': {
            name: 'react-pdf',
            minChunks: 2,
            priority: 20,
            test: /[\\/]node_modules[\\/]react-pdf[\\/]/,
          },
          'pdfjs-dist': {
            name: 'pdfjs-dist',
            minChunks: 2,
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
  });
};

export default webpackPlugin;
