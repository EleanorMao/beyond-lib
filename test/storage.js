var storage = beyondlib.storage;
var o = {
	name: 'beyond',
	age: '1'
}
describe("localStorage", function() {

	it("should set and get", function() {
		storage.clear()
		var cases = {
			'string'  : 'string',
			'boolean' : true,
			'number'  : 20,
			'array' : ['storage','browser','url'],
			'object'  : { name : 'beyondlib' , libs : ['storage','browser','url'] , company :{ name : '800best' , city : 'hangzhou'}  }
		}
		for(var k in cases){
			storage.set(k, cases[k])
		}
		for(var k in cases){
			expect(storage.get(k)).toEqual(cases[k])
		}
		expect(localStorage.length).toEqual(5)
		storage.remove('string')
		storage.remove('boolean')
		expect(localStorage.length).toEqual(3)
		storage.clear()
		expect(localStorage.length).toEqual(0)
	});

});

describe('cookie', function() {
	it('should has a cookie of cookie_key:cookie_value ', function() {
		storage.setCookie('cookie_key','cookie_value');
		storage.setCookie('cookie_key2','cookie_value2',1);
		storage.setCookie('cookie_key3','cookie_value3',0.5);
		storage.setCookie('cookie_key4','cookie_value4',-1);
		storage.setCookie('cookie_key5','cookie_value5',-0.5);
		expect(storage.getCookie('cookie_key')).toEqual('cookie_value');
		expect(storage.getCookie('cookie_key2')).toEqual('cookie_value2');
		expect(storage.getCookie('cookie_key3')).toEqual('cookie_value3');
		expect(storage.getCookie('cookie_key4')).toEqual(null);
		expect(storage.getCookie('cookie_key5')).toEqual(null);
	});
	it('should has a cookie of cookie_key:null ', function() {
		storage.setCookie('cookie_key6', 'cookie_value6');
		storage.removeCookie('cookie_key6', 'cookie_value6');
		expect(storage.getCookie('cookie_key6')).toEqual(null);
	});

});