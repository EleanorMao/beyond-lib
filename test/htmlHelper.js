
describe('encodeHTML', function() {
	var encodeHTML = beyondlib.encodeHTML
	it('should works', function() {
		var html = '<a href="#">hello&\'quote\'</a>'
		expect(encodeHTML(html)).toEqual('&lt;a href=&quot;#&quot;&gt;hello&amp;&#039;quote&#039;&lt;/a&gt;')
	});

});

describe('decodeHTML', function() {
	var decodeHTML = beyondlib.decodeHTML
	it('should works', function() {
		var str = '&lt;a href=&quot;#&quot;&gt;hello&amp;&#039;quote&#039;&lt;/a&gt;'
		expect(decodeHTML(str)).toEqual('<a href="#">hello&\'quote\'</a>')
	});
});