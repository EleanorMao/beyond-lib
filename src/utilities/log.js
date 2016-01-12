var toArray = require('./toArray')
var noop = require('./noop')


function bindMethod(method) {
	if (typeof console !== 'undefined' && console[method]) {
		if (console[method].apply) {
			return function(){
				console[method].apply(console,toArray(arguments))
			}
		}else{
			return function(){
				console[method](toArray(arguments))
			}
		}
	}
	return noop
}

module.exports = bindMethod('log')

exports.warn = bindMethod('warn')

exports.error = bindMethod('error')