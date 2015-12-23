var isArray = require('../../src/utilities/isArray')
describe('isArray', function() {
	it('should works', function() {

			
		expect( isArray([]) ).toEqual(true)
		expect( isArray({}) ).toEqual(false)
		expect( isArray({length : 4,slice : Array.prototype.slice}) ).toEqual(false)
		expect( isArray(1) ).toEqual(false);
		(function(){
			expect(isArray(arguments)).toEqual(false)
		})(1,2,3);
		expect( isArray(true) ).toEqual(false);
		expect( isArray(false) ).toEqual(false);
		expect( isArray(Boolean(true)) ).toEqual(false);
		expect( isArray(Boolean(false)) ).toEqual(false);
		// console.log(document.getElementsByTagName('body'))
		expect( isArray(document.getElementsByTagName('body')) ).toEqual(false);
		expect( isArray(new Date) ).toEqual(false);
		expect( isArray(/regexp/) ).toEqual(false);
		expect( isArray('array') ).toEqual(false);
	});
});