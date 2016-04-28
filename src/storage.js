var toArray = require('./utilities/toArray')

var defaults = {
	expire : 30,
	path : '/'
}

function getCookiePart(expire,path,domain,secure){
	var result = []
	if (typeof expire === 'number' && expire !== 0 && expire === expire){
		var d = new Date()
		d.setTime(d.getTime() + 24*60*60*1000*expire)
		result.push('; expires=' + d.toGMTString())
	}

	result.push(path ?  '; path='+path : '')
	result.push(domain ?  '; domain='+domain : '')
	result.push(secure ?  '; '+ secure : '')
	return result.join('')
}

function getCookie(key){
	var cookies = document.cookie ? document.cookie.split('; ') : [] , cookie
	for (var i = 0, len = cookies.length; i < len; i++) {
		cookie = cookies[i].split('=')
		if (cookie[0] === encodeURIComponent(key)){
			return decodeURIComponent(cookie[1])
		}
	}
	return null
}

function setCookie(key,value,expire,path,domain,secure) {
	expire = expire == null ? defaults.expire : Number(expire)
	path = path || defaults.path
	document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + getCookiePart(expire,path,domain,secure)
}

function removeCookie(key){
	setCookie(key,'',-30)
}

function storageProxy(type){
	if (!window || !window.localStorage) {
		throw new TypeError('localStorage is undefined')
	}
	var storage = window.localStorage
	var args = toArray(arguments)
	return storage[type].apply(storage,args.slice(1))
}

module.exports =  {

	set : function(key,value){
		var valueStr
		try{
			valueStr = JSON.stringify(value)
		}catch(e){
			valueStr = value
		}
		return storageProxy('setItem',key,valueStr)
	},

	get : function(key){ 
		var valueStr =  storageProxy('getItem',key)
		try{
			return JSON.parse(valueStr)
		}catch(e){
			return valueStr
		}
	},
	
	remove : function(key){
		return storageProxy('removeItem',key)
	},

	clear : function(){
		return storageProxy('clear')
	},

	setCookie : setCookie,
	
	getCookie : getCookie,
	
	removeCookie : removeCookie
}