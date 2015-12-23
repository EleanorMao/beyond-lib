'use strict';

var isArray = require('./isArray');
module.exports = function (arr, cb) {
	if (!isArray(arr)) {
		throw new TypeError('The first parameter must be array');
	}
	if (typeof cb !== 'function') {
		throw new TypeError('The second parameter must be function');
	}
	var result;
	for (var i = 0, len = arr.length; i < len; i++) {
		result = cb.call(arr, arr[i], i, arr);
		if (result === false) {
			break;
		}
	}
};