const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    publicPath: 'app/assets/javascripts/',
    hot: true,
  },
  devtool: 'inline-source-map',
});
