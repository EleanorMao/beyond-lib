'use strict';

var ArraySlice = Array.prototype.slice;

module.exports = function (obj) {
	if (!obj || !('length' in obj)) {
		throw new TypeError('Can not convert first argument to Array');
	}
	return ArraySlice.call(obj, 0);
};