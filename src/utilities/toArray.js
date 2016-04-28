var ArraySlice = Array.prototype.slice

module.exports = function (obj) {
	if (!obj ||  !('length' in obj) ) {
		throw new TypeError('Can not convert the argument to Array')
	}
	try{
		return ArraySlice.call(obj,0)
	}catch(e){
		//fix ie8 bug , eg not support for document.querySelectorAll
		var len = obj.length
		var arr = Array(len)
		for (var i = 0; i < len; i++) {
			arr[i] = obj[i]
		}
		return arr
	}
}