const webpack = require('webpack');

module.exports = {
  publicPath: '/',
  configureWebpack: {
    plugins: [
      new webpack.ProgressPlugin(),
    ],
  },
};
