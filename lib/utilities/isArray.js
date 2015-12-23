'use strict';

var ObjectToString = Object.prototype.toString;
var isArray;
if (typeof Array.isArray === 'function') {
	isArray = Array.isArray;
} else {
	isArray = function (arr) {
		if (!arr) {
			return false;
		}
		return ObjectToString.call(arr) === '[object Array]';
	};
}

module.exports = isArray;