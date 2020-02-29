import path from 'path';

import * as IWebpackChainConfig from 'webpack-chain';

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

const webpackPlugin = (config: IWebpackChainConfig) => {
  // optimize chunks
  config.optimization
    // share the same chunks across different modules
    .runtimeChunk(false)
    .splitChunks({
      maxAsyncRequests: 1,
      chunks: 'async',
      minChunks: 1,
      minSize: 0,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial', // async 的模块将不参与这个逻辑
          minChunks: 2, // 至少被两个入口 chunk 复用的模块才会被提取
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    });
    config
    .plugin('replace')
    .use(require('webpack').ContextReplacementPlugin)
    .tap(() => {
      return [/moment[/\\]locale$/, /zh-cn/];
    });
};

export default webpackPlugin;
