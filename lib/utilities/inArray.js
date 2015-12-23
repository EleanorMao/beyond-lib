'use strict';

var isArray = require('./isArray');
module.exports = function (search, arr) {
	if (!isArray(arr)) {
		throw new TypeError('The second param must be array');
	}
	if (typeof arr.indexOf === 'function') {
		return arr.indexOf(search) >= 0;
	} else {
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] === search) {
				return true;
			}
		}
		return false;
	}
};