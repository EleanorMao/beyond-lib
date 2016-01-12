'use strict';

var maps = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'\"': '&quot;',
	'\'': '&#039;'
};
var reverseMaps = {};
for (var k in maps) {
	reverseMaps[maps[k]] = k;
}

exports.encodeHTML = function (html) {
	html = '' + html;
	return html.replace(/(&|<|>|'|")/g, function (match) {
		return maps[match] || match;
	});
};

exports.decodeHTML = function (str) {
	str = '' + str;
	return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (match) {
		return reverseMaps[match] || match;
	});
};