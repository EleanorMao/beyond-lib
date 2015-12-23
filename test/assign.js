
describe('assign', function() {
	var assign = beyondlib.assign
	it('should has attr from others', function() {
		var o = {}
		var o1 = {name : 'beyond'}
		var o2 = {age : 1}
		assign(o,o1,o2)
		expect(o).toEqual({name : 'beyond' , age : 1})
	});
	it('should has return value', function() {
		var o1 = {name : 'beyond'}
		var o2 = {age : 1 , name : 'newbeyond2'}
		var o = assign({},o1,o2)
		expect(o).toEqual({name : 'newbeyond2' , age : 1})
	});
});