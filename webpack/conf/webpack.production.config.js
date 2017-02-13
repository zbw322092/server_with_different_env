'use strict';

import webpack from 'webpack';
import Config, { environment } from 'webpack-config';
import webpackConfEnv from '../webpack.config.env';

webpackConfEnv(environment);

export default new Config().extend({
  '[webpackRoot]/conf/webpack.development.config.js': config => {
    delete config.debug;
    delete config.devtool;
    delete config.output.pathinfo;
    return config;
  }
}).merge({
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: false,
      compress: {
        screw_ie8: false,
        dead_code: true,
        warnings: false,
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  ]
});
