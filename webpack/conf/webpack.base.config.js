var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Config = require('webpack-config');

module.exports = new Config.merge({
	externals: {
		jquery: '$'
	},
	plugins: [

	],
	module: {
		loaders: [
			{ test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!less') }
		]
	},
  plugins: [
    new ExtractTextPlugin('./[name]/bundle.css?[hash]', { allChunks: true })
  ],
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
