describe('namespace', function() {
	var namespace = beyondlib.namespace
	var beyond = {}
	var app = {}
	beyond.namespace = namespace
	it('should be a function', function() {
		expect(typeof beyond.namespace).toEqual('function')
	});

	it('should work for a.b.c', function() {
		beyond.namespace('a.b.c', function() {
			return {
				name: 'beyond'
			}
		})
		namespace(app,'a.b.c',function(){
			return {
				name: 'beyond'
			}
		})
		expect(beyond.a.b.c.name).toEqual('beyond')
		expect(app.a.b.c.name).toEqual('beyond')
		
		beyond.namespace('a1.b1.c1', {
			name: 'beyond'
		})
		namespace(app,'a1.b1.c1',{
			name: 'beyond'
		})
		expect(beyond.a1.b1.c1.name).toEqual('beyond')
		expect(app.a1.b1.c1.name).toEqual('beyond')
	});
});