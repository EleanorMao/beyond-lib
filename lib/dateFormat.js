'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * 返回格式化后的日期时间字符串
 * @example
 * beyond.dateFormat()  // 2014.02.01
 * beyond.dateFormat('yyyy')  // 返回当前时间戳的 2014格式
 * beyond.dateFormat('yyyy',Date.parse(2000))   // 2000
 * beyond.dateFormat(Date.parse(2000))  // 返回该时间戳的默认日期 2000.01.01
 * 
 * year: 年
 * yyyy/yyy   2015
 * yy/y  15
 * yyyyy 02015
 * month :  月
 * 
 * MM 03
 * M 3
 * date :  日
 * dd 09
 * d 9
 * hour :  小时
 * HH 0~24  24格式
 * H 0~24
 * hh 12    12格式
 * h 09
 * minuts :  分
 * mm  
 * m
 * second : 秒
 * ss
 * s
 * week day ： 星期几
 * u
 */

// var months = [
// 	'January',
// 	'February',
// 	'March',
// 	'April',
// 	'May',
// 	'June',
// 	'July',
// 	'August',
// 	'September',
// 	'October',
// 	'November',
// 	'December'
// ],
// shortMonths = [
// 	'Jan',
// 	'Feb',
// 	'Mar',
// 	'Apr',
// 	'May',
// 	'June',
// 	'July',
// 	'Aug',
// 	'Sep',
// 	'Oct',
// 	'Nov',
// 	'Dec'
// ],
var formats = {
	y: function y(match, date) {
		var year = '' + date.getFullYear();
		if (match.length <= 2) {
			return year.slice(2);
		} else if (match.length > 2 && match.length <= 4) {
			return year;
		} else {
			return expandDigit(year, match.length);
		}
	},
	M: function M(match, date) {
		return expandDigit(date.getMonth() + 1, match.length);
	},
	d: 'getDate',
	H: 'getHours',
	h: function h(match, date) {
		var h = date.getHours() % 12;
		return expandDigit(h, match.length);
	},
	m: 'getMinutes',
	s: 'getSeconds',
	S: function S(match, date) {
		return date.getMilliseconds();
	},
	u: function u(match, date) {
		var day = date.getDay();
		return day > 0 ? day : 7;
	}
},
    format_reg = null,
    format_code = [],
    default_format = 'yyyy.MM.dd';

for (var k in formats) {
	format_code.push(k + '+');
}

format_reg = new RegExp(format_code.join('|'), 'g');

function expandDigit(number, digit) {
	number = String(number);
	var len = number.length;
	return len < digit ? Array(digit - len + 1).join('0') + number : number;
}

function format(match, date) {
	var map = formats[match.charAt(0)];
	if (map) {
		return typeof map === 'function' ? map(match, date) : expandDigit(date[map](), match.length);
	} else {
		return match;
	}
}

function dateFormat(format_str, millisecond) {
	var len = arguments.length,
	    date;
	if (len === 0) {
		format_str = default_format;
		date = new Date();
	} else if (len === 1) {
		var type = typeof format_str === 'undefined' ? 'undefined' : _typeof(format_str);
		if (type === 'string') {
			date = new Date();
		} else if (type === 'number') {
			date = new Date(format_str);
			format_str = default_format;
		}
	} else {
		date = new Date(millisecond);
	}
	return format_str.replace(format_reg, function (match) {
		return format(match, date);
	});
}

module.exports = dateFormat;