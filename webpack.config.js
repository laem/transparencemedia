var webpack = require('webpack')
var prodEnv = process.env.NODE_ENV == 'production' // eslint-disable-line no-undef

module.exports = {
	devtool: 'cheap-module-source-map',

	entry: prodEnv ? [
		'babel-polyfill',
		'./client.js'
	] : [
		'webpack-dev-server/client?http://localhost:3000/',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		'babel-polyfill',
		'./client.js',
	],
	output: {
		path: require('path').resolve('./dist/'),
		filename: 'bundle.js',
		publicPath: '/dist/',
	},
	plugins: [
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.ProvidePlugin({
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
		}),
	]
	.concat(!prodEnv ? [new webpack.HotModuleReplacementPlugin()] : [])
	.concat(prodEnv ? [new webpack.optimize.UglifyJsPlugin()] : []),

	module: {
		loaders: [{
			test: /\.yaml$/,
			loader: 'json-loader!yaml-loader'
		}, {
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						importLoaders: 1,
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: 'inline',
					}
				}
			]
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.(jpe?g|png|gif|svg)$/i,
			loader: 'url-loader?limit=10000!img-loader?progressive=true',
		}]
	}
}
