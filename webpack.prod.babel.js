import baseConfig from './webpack.common';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default merge(baseConfig, {
	output: {
		// path: 'build',
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.[chunkhash].js',
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader'
						}, {
							loader: 'sass-loader'
						}
					]
				})
			}
		]
	},

	plugins: [
		// Extract imported CSS into own file
		new ExtractTextPlugin({
			filename: '[name].[chunkhash].css'
		}),

		// Minify JS
		new UglifyJsPlugin({
			sourceMap: false,
			compress: true
		}),

		// Minify CSS
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
});
