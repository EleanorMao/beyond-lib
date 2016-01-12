'use strict';

/**
 * var app = {}
 * app.namespace = beyondlib.namespace
* app.namespace('mvc.Model',function(){
* 	return function(){}
* })
* app.namespace('mvc.model',function(){
* 	return {}
* })
* namespace(app,'xx.xx',function(){})
* 
* namespace string
* fn function/object
*   
*/
module.exports = function (obj, namespace, fn) {
	var path,
	    len = arguments.length;
	if (len === 3) {
		path = obj;
	} else if (len === 2) {
		fn = namespace;
		namespace = obj;
		path = this;
	}
	if (typeof namespace !== 'string') {
		throw new TypeError('The namespace argument must be string');
	}
	if (namespace) {
		namespace = namespace.replace(/^[\s\.]+|[\s\.]+$/, '').split('.');
		for (var i = 0, length = namespace.length; i < length; i++) {
			if (i < length - 1) {
				if (path[namespace[i]] == null) {
					path[namespace[i]] = {};
				}
				path = path[namespace[i]];
			} else {
				path[namespace[i]] = typeof fn === 'function' ? fn() : fn;
			}
		}
	}
};