module.exports = {
	context: __dirname + "/src",
	entry: "./index.js",
	output: {
	    path: __dirname + "/dist",
	    filename: "beyondlib.js",
	    library : 'beyondlib',
	    libraryTarget: "umd"
	},
	module : {
		loaders: [
			{ test : /\.jsx?$/ ,loader : 'babel?presets[]=es2015' , exclude: /(node_modules|bower_components)/}
		]
	}
}