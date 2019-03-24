const merge = require('webpack-merge');
const common = require('./webpack.common');
const config = require('./config');

module.exports = merge(common, {
  output: {
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    clientLogLevel: 'error',
    contentBase: './dist',
    historyApiFallback: {
      rewrites: [...config.devServerRewrites()],
    },
    disableHostCheck: true,
  },
});
