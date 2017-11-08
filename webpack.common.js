const bootstrapEntryPoints = require('./webpack.bootstrap.config');

const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const bootstrapConfig = isProduction ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = {
	entry: {
		app: './src/app',
		bootstrap: bootstrapConfig
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},

			{
				test: reImage,
				use: [
					{
						loader: 'file-loader',
						options: {
							name(file) {
								// if (isDevelopment) {
								// 	return '[path][name].[ext]?[hash]'
								// }

								return '[path][name].[ext]?[hash]'
							},
							useRelativePath: isProduction,
							outputPath: isProduction ? '/assets' : '/',
							publicPath: '/'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							// Speed up initial and subsequent compilations while developing 
							bypassOnDebug: true
						}
					}
				]
			},

			// Bootstrap 4
			{
				test: /bootstrap\/dist\/js\/umd\//,
				use: 'imports-loader?jQuery=jquery'
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether",
			Popper: ['popper.js', 'default'],
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			// Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			// Button: "exports-loader?Button!bootstrap/js/dist/button",
			// Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			// Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			// Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			// Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			// Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Util: "exports-loader?Util!bootstrap/js/dist/util"
		  }),

		new webpack.EnvironmentPlugin([
			'NODE_ENV'
		])
	]
};
