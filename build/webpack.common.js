
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const config = require('./config');

const isProd = ['production'].includes(process.env.NODE_ENV);
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: config.entries,
  plugins: [
    new ManifestPlugin(),
    ...config.htmlWebpackPlugins(),
  ],
}
