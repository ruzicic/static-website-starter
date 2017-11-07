const baseConfig = require('./webpack.common');

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const reStyle = /\.(css|scss|sass)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = merge(baseConfig, {
	devtool: 'eval-source-map',
	devServer: {
		inline: true,
		contentBase: path.resolve(__dirname, 'src'),
		port: 9000,
		hot: true // Hot module replacement
	},
	module: {
		rules: [
			{
				test: reStyle,
				include: [
					path.resolve(__dirname, '../')
				],
				use: [
					// creates style nodes from JS strings
					{
						loader: 'style-loader'
					},

					// translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},

					// Apply PostCSS plugins including autoprefixer
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: './postcss.config.js',
							},
							importLoaders: 1
						}
					},

					// compiles Sass to CSS
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			hash: true,
			minify: {
				collapseWhitespace: false
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	]
});
