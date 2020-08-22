const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js',
  },
  plugins: [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })],
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*'],
  },
  optimization: {
    usedExports: true,
  }
};
