const baseConfig = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
	'dist'
];

// the clean options to use
let cleanOptions = {
	root: path.resolve(__dirname),
	exclude: [],
	verbose: true,
	dry: false
};

const reStyle = /\.(css|scss|sass)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = merge(baseConfig, {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.[chunkhash:8].js',
	},

	module: {
		rules: [
			{
				test: reStyle,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: './postcss.config.js',
							},
							importLoaders: 1
						}
					},
					{
						loader: 'sass-loader'
					}]
				})
			}
		]
	},

	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),

		// Extract imported CSS into own file
		new ExtractTextPlugin({
			filename: '[name].[chunkhash:8].css',
			allChunks: true
		}),

		// Minify JS
		new UglifyJsPlugin({
			sourceMap: false,
			compress: true
		}),

		// Minify CSS
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),

		// Emit a file with assets paths
		// https://github.com/sporto/assets-webpack-plugin#options
		new AssetsPlugin({
			path: path.resolve(__dirname, 'dist'),
			filename: 'assets.json',
			prettyPrint: true
		}),

		// Decrease script evaluation time
		// https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
		new webpack.optimize.ModuleConcatenationPlugin(),
	]
});
