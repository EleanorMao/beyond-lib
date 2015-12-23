var each = require('../../src/utilities/each')
describe('each', function() {
	it('should works', function() {
		var index = 0
		var array = [1,2,3,4,5]
		each(array,function(value,i,arr){
			expect(i).toEqual(index)
			expect(value).toEqual(array[index])
			expect(arr).toEqual(array)
			index++
		})
		expect(index).toEqual(array.length)
	});
	it('should break when return false', function() {
		var index = 0
		var stop = 3
		var array = [1,2,3,4,5]
		each(array,function(value,i,arr){
			expect(i).toEqual(index)
			expect(value).toEqual(array[index])
			expect(arr).toEqual(array)
			if (index >= stop ) {
				return false
			}
			index++
		})
		expect(index).toEqual(stop)
	});
});