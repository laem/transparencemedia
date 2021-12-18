var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var port = 3000

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		assets: true,
		colors: true,
		version: false,
		hash: false,
		timings: false,
		chunks: false,
		chunkModules: true
	},
	noInfo: false,
}).listen(port, 'localhost', function (err) {
	if (err)
		console.log(err) //eslint-disable-line no-console
	console.log('Rendez-vous sur localhost:3000') //eslint-disable-line no-console
})
