const webpack = require('webpack');

module.exports = {
  publicPath: 'Front',
  configureWebpack: {
    plugins: [
      new webpack.ProgressPlugin(),
    ],
  },
};
