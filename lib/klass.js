/**
 * var Parent = klass({
 *  foo : 1,
 *  bar : function(){return 0},
 * 	Mixins : [{
 * 		foo : function(){}
 * 	}],
 * 	Static : {
 * 	
 * 	}
 * 	constructor : function(){},
 * 		
 * })
 *
 * var Child = Parent.extend({
 *
 *  foo : 2,
 *  bar : function(){
 *  	return Child.upper(this,'bar') + 1
 *  	return Child.upper(this,arguments,'bar') + 1
 *  },
 * 	constructor(){
 * 		Child.upper(arguments)
 * 	}
 * })
 *
 * var Leaf = Child.extend({
 * 	constructor(){
 * 		Leaf.upper(this)
 * 		Leaf.upper(this,arguments)
 * 	},
 * 	bar : function(){
 * 		return Leaf.upper(this,arguments) + 1
 * 		return Leaf.upper(this,'bar') + 1
 * 		return Leaf.upper(this,arguments,'bar') + 1
 * 	}
 * })
 */

/**
 * 没有定义构造函数，存在继承的话，则自动调用父类构造函数，不存在继承，则赋值为空的函数noop
 * @param  {Object(Static,)} options [description]
 * @return {Object}  {methods,fields,constructor,mixins,static}
 */
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var _require = require('./utilities/log');

var warn = _require.warn;

var assign = require('./assign');
var noop = require('./utilities/noop');
var each = require('./utilities/each');
var toArray = require('./utilities/toArray');

function parseOptions(options) {
	options = options || {};
	var Static = options.Static || {};
	var Mixins = options.Mixins || [];
	var constructor = options.hasOwnProperty('constructor') && typeof options.constructor === 'function' ? options.constructor : null;
	var fields = {},
	    methods = {};
	for (var key in options) {
		if (options.hasOwnProperty(key)) {
			var value = options[key];
			if (key === 'Static' || key === 'Mixins' || key === 'constructor') {
				continue;
			}
			if (typeof value === 'function') {
				methods[key] = value;
			} else {
				fields[key] = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value != null) {
					warn('Not recommend to set object type,includes Date , Object , Array etc on klass options,it may make program errors');
				}
			}
		}
	}
	if (Static.extend || Static.Parent || Static.upper || Static.hasOwnProperty('constructor') || Static.__AssignFields__) {
		warn('Not recommend to set `extend` , `Parent` , `upper` , `constructor` and like `__XX__`  properties on klass Static options, Klass may not work');
	}
	return { Static: Static, Mixins: Mixins, constructor: constructor, fields: fields, methods: methods };
}

function upper(context, args, method) {
	var len = arguments.length;
	if (len >= 3) {
		args = toArray(args);
	} else if (len === 2) {
		if (typeof args === 'string') {
			method = args;
			args = [];
		} else {
			args = toArray(args);
			method = 'constructor';
		}
	} else if (len === 1) {
		method = 'constructor';
		args = [];
	} else {
		throw new TypeError('The context argument must be add on upper');
	}
	if (typeof this !== 'function') {
		throw new Error('upper should be call via a Klass');
	}
	if (method === 'constructor') {
		return this.Parent.constructor.apply(context, args);
	} else {
		if (typeof this.Parent.prototype[method] === 'function') {
			return this.Parent.prototype[method].apply(context, args);
		} else {
			throw new Error('method ' + method + ' does not define');
		}
	}
}

function extend(options) {
	if (typeof this !== 'function') {
		throw new Error('extend should be call via a Klass');
	}
	return createKlass(options, this);
}

function Temp() {}

function createKlass(options, Parent) {
	options = parseOptions(options);

	//调用父类的构造函数
	if (typeof Parent === 'function' && !options.constructor) {
		options.constructor = Parent.constructor;
	}

	if (!options.constructor) {
		options.constructor = noop;
	}
	//定义类
	var Class = function Class() {
		'use strict';

		if (typeof window !== 'undefined' && this === window || this == null) {
			throw new Error('The Class can not be called as a function');
		}
		Class.__AssignFields__(this);
		Class.constructor.apply(this, toArray(arguments));
	};
	//构造父类的原型
	if (typeof Parent === 'function') {
		Temp.prototype = Parent.prototype;
		Class.prototype = new Temp();
		Temp.prototype = null;
	}
	//定义mixins方法
	each(options.Mixins, function (mixin) {
		assign(Class.prototype, mixin);
	});
	//定义 方法
	assign(Class.prototype, options.methods);
	//定义静态属性
	assign(Class, options.Static);
	//klass内置方法定义
	if (!options.Static.hasOwnProperty('extend')) {
		Class.extend = extend;
	}
	if (!options.Static.hasOwnProperty('parent') && typeof Parent === 'function') {
		Class.Parent = Parent;
	}
	if (!options.Static.hasOwnProperty('upper')) {
		Class.upper = upper;
	}
	if (!options.Static.hasOwnProperty('constructor')) {
		Class.constructor = options.constructor;
	}
	if (!options.Static.hasOwnProperty('__AssignFields__')) {
		Class.__AssignFields__ = function (context) {
			if (this.Parent && this.Parent.__AssignFields__) {
				this.Parent.__AssignFields__(context);
			}
			assign(context, options.fields);
		};
	}
	return Class;
}

function klass(options) {
	return createKlass(options);
}
module.exports = klass;