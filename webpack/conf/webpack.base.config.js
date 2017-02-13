var ExtractTextPlugin = require('extract-text-webpack-plugin');
import Config from 'webpack-config';

module.exports = new Config().merge({
	externals: {
		jquery: '$'
	},
  plugins: [
    new ExtractTextPlugin('./[name]/bundle.css?[hash]', { allChunks: true })
  ],
	module: {
		loaders: [
			{ test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!less') }
		]
	},
  resolve: {
  	root: [
  		process.cwd()
  	],
  	extensions: ['', '.js', '.json'],
    modulesDirectories: [
      'node_modules'
    ]
  }
});
