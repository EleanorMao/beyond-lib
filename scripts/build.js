var webpackConfig = require('../webpack.config.js')
var webpack = require('webpack')
webpackConfig.plugins = webpackConfig.plugins || []
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    mangle: {
        except: ['$super', '$', 'exports', 'require']
    }
})
webpackConfig.plugins.push(uglifyJsPlugin)
webpackConfig.output.filename = webpackConfig.output.filename.replace('.js','.min.js')
webpack(webpackConfig,function (err,stats) {
	if (err) {
		console.error(err)
	}else{
		console.log('success build beyondlib.min.js')
	}
})