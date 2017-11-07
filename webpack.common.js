const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/app',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						// https://babeljs.io/docs/usage/options/
						babelrc: false,

						presets: [
							// A Babel preset that can automatically determine the Babel plugins and polyfills
							// https://github.com/babel/babel-preset-env
							[
								'env',
								{
									targets: {
										browsers: [
											">1%",
											"last 4 versions",
											"Firefox ESR",
											"not ie < 9"
										]
									},
									modules: false,
									useBuiltIns: false,
									debug: false
								}
							]
						]
					}
				}
			}
		]
	},
	plugins: [
		new webpack.EnvironmentPlugin([
			'NODE_ENV'
		])
	]
};
