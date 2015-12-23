//扩展函数，目前仅支持浅复制，会过滤原型字段
let toArray = require('./utilities/toArray')
let assign = null

if (typeof Object.assign === 'function') {
	assign = Object.assign
}else{
	assign =  function (){
		if (Object.assign) {
			var args = toArray(arguments) 
			return Object.assign.apply(Object,args)
		}else{
			var dest = arguments[0]
			if (dest == null){
				throw new TypeError('Cannot convert first argument to object')
			}
			for (var i = 1 ,len = arguments.length; i < len; i++) {
				if (arguments[i] && (typeof arguments[i] === 'object' || typeof arguments[i] === 'function')){
					for(var key in arguments[i]) 
						if (arguments[i].hasOwnProperty(key)) dest[key] = arguments[i][key]
				} 
			}
			return dest
		}
	}
}

module.exports = assign