var isArray = require('./isArray')
module.exports = function (value , arr) {
	if (!isArray || arr.length == null) {
		throw new TypeError('The second argument must be an Array or Array Like')
	}
	if (typeof arr.includes === 'function') {
		return arr.includes(value)
	} else if (typeof arr.indexOf === 'function') {
		return arr.indexOf(value) >= 0
	}
	for(var i = 0, len = arr.length; i < len; i++){
		if (arr[i] === value) {
			return true
		}
	}
	return false
}