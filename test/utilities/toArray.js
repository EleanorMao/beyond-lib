var toArray = require('../../src/utilities/toArray')
describe('toArray', function() {
	it('should works', function() {

			
		expect( toArray({length : 0,slice : Array.prototype.slice}) ).toEqual([]);
		(function(){
			expect(toArray(arguments)).toEqual([1,2,3])
		})(1,2,3);
		expect(toArray(document.querySelectorAll('div')).slice).toEqual(Array.prototype.slice)
	});
});