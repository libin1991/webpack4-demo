
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    path: path.resolve('dist'),
    filename: '[name]-[chunkhash:8].js',
    // chunkFilename: '[name]/[name]-[chunkhash:8].js',
    // publicPath: 'http://cdn.example.com/'
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
