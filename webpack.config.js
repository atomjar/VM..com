var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	context: path.resolve('./app'),
	entry: './js/index.js',
	output: {
		path: path.resolve('./dist/'),
		filename: 'js/bundle.js',
		publicPath: '/'
	},
	module: {
		devtool: 'source-map',
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				presets: ['es2015']
			}
		},{
			test: /\.html$/,
			loader: 'html'
		},{
			test: /\.s[ac]ss$/,
			loaders: ["style", "css", "sass"]
		},{
			test: /\.css$/,
			loaders: ["style", "css"]
		},{
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
		},{
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "file?name=fonts/[name].[ext]"
		},{
			test: /\.(jpe?g|png|gif)$/,
  		loader:'file?name=img/[name].[ext]'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
		}),
		new BrowserSyncPlugin({
			server: {
				baseDir: ['dist']
			},
			port: 3000,
			host: 'localhost',
			open: false
		}),
		new CopyWebpackPlugin([{
			from: './manifest.json'
		},{
			from: './manifest.webapp'
		},{
			from: './robots.txt'
		},{
			from: './favicon.ico'
		},{
			from: './'
		},{
			from: './img/**/*',
			to: './'
		}])
	]
}
