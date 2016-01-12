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
 *  	return Child._super(this,'bar') + 1
 *  	return Child._super(this,arguments,'bar') + 1
 *  },
 * 	constructor(){
 * 		Child._super(arguments)
 * 	}
 * })
 *
 * var Leaf = Child.extend({
 * 	constructor(){
 * 		Leaf._super(this)
 * 		Leaf._super(this,arguments)
 * 	},
 * 	bar : function(){
 * 		return Leaf._super(this,arguments,'bar') + 1
 * 		return Leaf._super(this,arguments,'bar') + 1
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
	var Static = options.Static || {};
	var Mixins = options.Mixins || [];
	var constructor = options.hasOwnProperty('constructor') && typeof options.constructor === 'function' ? options.constructor : null;
	var fields = {},
	    methods = {};
	for (var key in options) {
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
	if (Static.extend || Static.parent) {
		warn('Not recommend to set `extend` , `parent` , `_super`,`constructor` properties on klass Static options, extends would not work');
	}
	return { Static: Static, Mixins: Mixins, constructor: constructor, fields: fields, methods: methods };
}

function _super(context, args, method) {
	var len = arguments.length;
	if (len >= 3) {
		args = toArray(arguments);
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
		throw new TypeError('The context argument must be add on _super');
	}
	if (typeof this !== 'function') {
		throw new Error('_super should be call via a Klass');
	}
	if (method === 'constructor') {
		this.parent.constructor.apply(context, args);
	} else {
		if (typeof this.parent.prototype[method] === 'function') {
			this.parent.prototype[method].apply(context, args);
		} else {
			warn('method ' + method + ' does not define');
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
	options = options || {};
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
		Class._assignFields(this);
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
		Class.parent = Parent;
	}
	if (!options.Static.hasOwnProperty('_super')) {
		Class._super = _super;
	}
	if (!options.Static.hasOwnProperty('constructor')) {
		Class.constructor = options.constructor;
	}
	if (!options.Static._assignFields) {
		Class._assignFields = function (context) {
			if (this.parent && this.parent._assignFields) {
				this.parent._assignFields(context);
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