describe("klass(es6)", function() {
	var klass = beyondlib.klass
	var Class = klass({
		foo : 'foo',
		bar : 'bar',
		constructor : function(){
			this.field1 = 'field1'
			this.field2 = 'field2'
			this.field3 = 'field3'
		},
		fn1 : function(){
			return 'fn1'
		},
		fn2 : function(){
			return 'fn2'
		},
		fn3 : function(text){
			return text
		}
	})
	var SubClass = Class.extend({
		foo : 'foo_over',
		fn2 : function(){
			return 'fn2_over';
		}
	})
	var SubClass2 = Class.extend({
		constructor : function(){
			this.field1 = 'field1_over'
			this.field2 = 'field2_over'
		},
		fn2 : function(){
			return SubClass2._super(this,'fn2') + '_over'
		},
		fn3 : function(){
			return SubClass2._super(this,['fn3'],'fn3') + '_over'
		}
	})
	
	var obj = new Class
	var sub = new SubClass
	var sub2 = new SubClass2
	it("should has fields and method", function() {
		expect(obj.foo).toEqual('foo');
		expect(obj.bar).toEqual('bar');
		expect(obj.fn1()).toEqual('fn1');
		expect(obj.fn2()).toEqual('fn2');
	});
	it('should has constructor', function() {
		expect(obj.field1).toEqual('field1');
		expect(obj.field2).toEqual('field2');
	});
	it('should has exnted', function() {
		//constructor extends
		expect(sub.field1).toEqual('field1');
		expect(sub.field2).toEqual('field2');
		expect(sub.field3).toEqual('field3');
		//constructor over
		expect(sub2.field1).toEqual('field1_over');
		expect(sub2.field2).toEqual('field2_over');
		expect(sub2.field3).toEqual(undefined);
		//fields & methods extends
		expect(sub.bar).toEqual('bar');
		expect(sub.fn1()).toEqual('fn1');
		//fields & methods over
		expect(sub.foo).toEqual('foo_over');
		expect(sub.fn2()).toEqual('fn2_over');
	});
});