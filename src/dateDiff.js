/**
 * 如果 arg1 大于 arg2 ，则返回正数，否则返回负数，相等返回 0
 * dateDiff.seconds(arg1,arg2) => number
 * dateDiff.minutes(arg1,arg2) => number
 * dateDiff.hours(arg1,arg2) => number
 * dateDiff.weeks(arg1,arg2) => number
 * dateDiff.days(arg1,arg2) => number
 * dateDiff.months(arg1,arg2) => number
 * dateDiff.years(arg1,arg2) => number
 * 
 * dateDiff(arg1,arg2)  => {years , months , days , weeks ,hours ,minutes,seconds  }
 */
// var inArray('./utilities/inArray')

var dayMilliseconds = 86400000

function isDate(date){
	return date && Object.prototype.toString.call(date) === '[object Date]'
}

function isTimestamp(timestamp){
	return typeof timestamp === 'number' && timestamp === timestamp
}

function coverToDate (timestamp) {
	if (isDate(timestamp)) {
		return timestamp
	}
	if (!isTimestamp(timestamp)) {
		throw new TypeError('The first argument must be a number')
	}
	return new Date(timestamp)
}

function coverToTimestamp(date) {
	if (isTimestamp(date)) {
		return date
	}
	if (!isDate(date)) {
		throw new TypeError('The first argument must be a number')
	}
	return date.valueOf()
}

function years(arg1,arg2){
	var date1 = coverToDate(arg1)
	var date2 = coverToDate(arg2)
	return date1.getFullYear() - date2.getFullYear()
}

function months(arg1,arg2){
	var date1 = coverToDate(arg1)
	var date2 = coverToDate(arg2)
	var offsetYear = years(date1,date2)
	return offsetYear * 12 + (date1.getMonth() - date2.getMonth())
}

function days(arg1,arg2){
	var date1 = coverToDate(arg1)
	var date2 = coverToDate(arg2)
	date1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate())
	date2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate())
	return (date1 - date2) / dayMilliseconds
}

function hours(arg1,arg2){
	var timestamp1 = coverToTimestamp(arg1)
	var timestamp2 = coverToTimestamp(arg2)
	return Math.floor(timestamp1 / (1000 * 60 * 60)) - Math.floor(timestamp2 / (1000 * 60 * 60))
}

function minutes(arg1,arg2){
	var timestamp1 = coverToTimestamp(arg1)
	var timestamp2 = coverToTimestamp(arg2)
	return Math.floor(timestamp1 / (1000 * 60)) - Math.floor(timestamp2 / (1000 * 60))
}

function seconds(arg1,arg2){
	var timestamp1 = coverToTimestamp(arg1)
	var timestamp2 = coverToTimestamp(arg2)
	return Math.floor(timestamp1 / 1000) - Math.floor(timestamp2 / 1000)
}

module.exports = {years,months,days,hours,minutes,seconds}
