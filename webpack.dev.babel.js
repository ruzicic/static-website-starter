import baseConfig from './webpack.common.babel';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default merge(baseConfig, {
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
				test: /\.scss$/,
				use: [
					// creates style nodes from JS strings
					{
						loader: "style-loader"
					},
					// translates CSS into CommonJS
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					// compiles Sass to CSS
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
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
		// Enable Hot module replacement
		new webpack.HotModuleReplacementPlugin(),

		// Prints more readable module names in the browser
		new webpack.NamedModulesPlugin()
	]
});