const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

const isProd = ['production'].includes(process.env.NODE_ENV);
const sourceMap = !isProd;
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: config.entries,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
      '@stu': path.resolve('src/pages/student'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        loader: [
          {
            loader: 'vue-loader',
          },
          'eslint-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        loader: [
          !isProd
            ? 'vue-style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
            },
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
              sourceMap: sourceMap ? 'inline' : false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap,
              indentedSyntax: true,
            },
          },
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: [
          //       path.resolve('src/assets/style/_variables.sass'),
          //       path.resolve('src/assets/style/_mixins.sass'),
          //     ],
          //   },
          // },
        ],
      },
      {
        test: /\.css$/,
        loader: [
          !isProd
            ? {
              loader: 'style-loader',
              options: {
                sourceMap,
              },
            }
            : {
              loader: MiniCssExtractPlugin.loader,
            },
          {
            loader: 'css-loader',
            options: {
              sourceMap,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 5,
              name: '[path][name]-[hash:8].[ext]',
              context: path.resolve('src'),
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[path][name]-[hash:7].[ext]',
          context: path.resolve('src'),
          outputPath: 'media/',
        },
      },
      {
        test: /\.(woff|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 5,
              name: '[path][name]-[hash:8].[ext]',
              context: path.resolve('src'),
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ManifestPlugin(),
    ...config.htmlWebpackPlugins(),
    new VueLoaderPlugin(),
  ],
}
