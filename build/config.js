const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {pages} = require('../config.json');

if (!Array.isArray(pages) || !pages.length) {
  process.stdout.write('pages不能为空');
  process.exit(1);
}

const entries = pages.reduce((entries, entry) => {
  entries[entry] = './' + path.join('src/pages', entry, 'index.js');
  return entries;
}, {});


const devServerRewrites = () => {
  return Object.keys(entries).map((entry) => {
    return {
      from: new RegExp(`^\/${entry}`),
      to: '/' + resolveFilename(entry),
    };
  });
};

const htmlWebpackPlugins = function() {
  const isDev = process.env.NODE_ENV === 'development';
  const minify = isDev ? false : {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
  };
  return Object.keys(entries).map((entry) => {
    const template = resolveTemplate(isDev, entry);
    const filename = resolveFilename(entry);
    return new HtmlWebpackPlugin({
      template,
      filename,
      chunks: [entry],
      minify,
    });
  });
};

const DEV_INDEX = 'dev.html';
const PROD_INDEX = 'prod.html';
function resolveTemplate(isDev, entry) {
  if (!entry) {
    throw new Error('Error in resolveTemplate: undefined entry');
  }
  return path.join('src', 'pages', entry, 'template', isDev ? DEV_INDEX : PROD_INDEX);
}
function resolveFilename(entry) {
  return `${entry}/${entry}.html`;
}

exports.entries = entries;
exports.devServerRewrites = devServerRewrites;
exports.htmlWebpackPlugins = htmlWebpackPlugins;
