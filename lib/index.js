'use strict';

var _require = require('./htmlHelper');

var encodeHTML = _require.encodeHTML;
var decodeHTML = _require.decodeHTML;

module.exports = {
	assign: require('./assign'),
	browser: require('./browser'),
	dateFormat: require('./dateFormat'),
	storage: require('./storage'),
	url: require('./url'),
	namespace: require('./namespace'),
	dateDiff: require('./dateDiff'),
	klass: require('./klass'),
	encodeHTML: encodeHTML,
	decodeHTML: decodeHTML
};