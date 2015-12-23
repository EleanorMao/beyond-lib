var assign = require('./assign')
var  defaults = {
	name : 'unknow', 
	version : 'unknow',
	device  : 'unknow',
	platform : 'unknow'
}

var browsers = [{
	name : 'oIE',
	test :  /msie ([\d.]+)/
},{
	name : 'IE',
	test : /trident.+rv:([\d.]+)/
},{
	name : 'Edge',
	test : /edge\/([\d.]+)/
},{
	name : 'MicroMessenger',
	test : /micromessenger.([\d.]+)/	
},{
	name : 'Chrome',
	test : /chrome\/([\d.]+)/	
},{
	name : 'Firefox',
	test : /firefox\/([\d.]+)/	
},{
	name : 'Opera',
	test : /opera.([\d.]+)/	
},{
	name : 'Safari',
	test : /version\/([\d.]+).*safari/
}]

var platform = {
	Windows : /windows nt/
	,Mac : /macintosh/
	// ,WindowsPhone : /windows phone/
	,iPhone : /iphone/
	,iPad : /ipad/
	,iPod : /ipod/
	,Andriod : /andriod/
	,Linux : /linux/
}

var IEVersions = [6,7,8,9,10,11]

function parse (ua) {
	ua = ua || navigator.userAgent
	ua = ua.toLowerCase()
	return assign({} , defaults , parseBrowser(ua) , parsePlatform(ua))
}

function parseBrowser (ua) {
	var o = {} , i ,len
	for(i = 0,len = browsers.length; i<len; i++){
		var result = browsers[i].test.exec(ua)
		if (result){
			o.name = (browsers[i].name === 'oIE') ? 'IE' : browsers[i].name
			o.version = result[1]
			break
		}
	}
	for(i = 0,len = browsers.length; i < len; i++){
		var name = browsers[i].name
		if (name === 'oIE') { 
			name = 'IE'
		}
		o['is'+name] = ( o.name === name )
	}
	for (i = IEVersions.length - 1; i >= 0; i--) {
		o['isIE' + IEVersions[i]] = ( o.name === 'IE' && parseInt(o.version,10) === IEVersions[i] )
	}
	o.isIE678 = o.isIE6 || o.isIE7 || o.isIE8 
	return o
}

function parsePlatform (ua) {
	var o = {}
	for(var i in platform){
		if (platform[i].test(ua)) {
			o.platform = i
			break
		}
	}
	return o
}

var result = typeof navigator !== 'undefined' ? parse() : {}
assign(result,{parse : parse})

module.exports = result