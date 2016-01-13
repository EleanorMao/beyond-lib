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
		},
		Mixins : [{
			mixin1 : function(){ return 'mixin1'},
			mixin2 : function(){ return 'mixin2'}
		}],

		Static : {
			static1 : 'static1',
			static2 : function(){return 'static2'}
		}
	})
	var SubClass = Class.extend({
		foo : 'foo_over',
		fn2 : function(){
			return 'fn2_over';
		}
	})
	var SubClass2 = Class.extend({
		bar :'bar_over',
		constructor : function(){
			this.field1 = 'field1_over'
			this.field2 = 'field2_over'
		},
		fn2 : function(){
			return SubClass2.upper(this,'fn2') + '_over'
		},
		fn3 : function(){
			return SubClass2.upper(this,['fn3'],'fn3') + '_over'
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
	describe("klass(es6) extends",function(){

		it('should extends constructor', function() {
			expect(sub.field1).toEqual('field1');
			expect(sub.field2).toEqual('field2');
			expect(sub.field3).toEqual('field3');
		});
		it("should over constructor",function(){
			expect(sub2.field1).toEqual('field1_over');
			expect(sub2.field2).toEqual('field2_over');
			expect(sub2.field3).toEqual(undefined);
		})
		it("should extends fields & methods",function(){
			expect(sub.bar).toEqual('bar');
			expect(sub.fn1()).toEqual('fn1');

			expect(sub2.foo).toEqual('foo');
		})
		it("should over fields & methods",function(){
			expect(sub.foo).toEqual('foo_over');
			expect(sub.fn2()).toEqual('fn2_over');

			expect(sub2.bar).toEqual('bar_over');
			expect(sub2.fn2()).toEqual('fn2_over');
			expect(sub2.fn3()).toEqual('fn3_over');

		})
	})
	describe("klass(es6) third extends",function(){
		var SubSubClass2 = SubClass2.extend({

			bar : 'bar_over_over',
			fn2 : function(){
				return SubSubClass2.upper(this,'fn2') + '_over'
			},
			fn3 : function(){
				return SubSubClass2.upper(this,['fn3'],'fn3') + '_over'
			}
		})
		var subsub2 = new SubSubClass2
		it("should extends fields & methods",function(){
			expect(subsub2.foo).toEqual('foo');
			expect(subsub2.fn1()).toEqual('fn1');
		})
		it("should over fields & methods",function(){
			expect(subsub2.bar).toEqual('bar_over_over');
			expect(subsub2.fn2()).toEqual('fn2_over_over');
			expect(subsub2.fn3()).toEqual('fn3_over_over');
		})
	})

	describe("klass Mixins",function(){
		var SubMixinClass = Class.extend({
			mixin1 : function(){ return 'mixin1_over'},
		})
		var SubMixinClass2 = Class.extend({
			Mixins : [{
				mixin1 : function(){ return 'mixin1_over'}
			}]
		})
		var SubSubMixinClass = SubMixinClass.extend({
			mixin1 : function(){ return 'mixin1_over_over'}
		})
		var subMixin2 = new SubMixinClass2
		var subMixin = new SubMixinClass
		var subsubMixinx = new SubSubMixinClass
		it("should works well",function(){
			expect(obj.mixin1()).toEqual('mixin1')
			expect(obj.mixin2()).toEqual('mixin2')
		})
		it("should be over",function(){
			expect(subMixin.mixin1()).toEqual('mixin1_over')
			expect(subMixin2.mixin1()).toEqual('mixin1_over')
			expect(subsubMixinx.mixin1()).toEqual('mixin1_over_over')
		})
		it("should be extend",function(){
			expect(subMixin.mixin2()).toEqual('mixin2')
			expect(subMixin2.mixin2()).toEqual('mixin2')
			expect(subsubMixinx.mixin2()).toEqual('mixin2')
		})
	})

	describe("klass Static",function(){
		it("should works well",function(){
			expect(Class.static1).toEqual('static1')
			expect(Class.static2()).toEqual('static2')
		})
		it("should not be extend",function(){
			expect(SubClass.static1).toEqual(undefined)
			expect(SubClass.static2).toEqual(undefined)
		})
	})
});