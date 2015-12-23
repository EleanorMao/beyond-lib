
var assign = require('./assign')
var url = {}
function Url(){
	this.protocol = null
	this.auth = null
	this.user = null
	this.pass = null
	this.host = null
	this.port = null
	this.hostname = null
	this.hash = null
	this.search = null
	this.query = null
	this.pathname = null
	this.href = null
}

function parseUrl (_url) {
	var _urls,result,host,auth,i,path,search,query,hash
	result = new Url()
	if (!url) {
		return result
	}
	//protocol fixed
	if(_url.indexOf('//') === 0) 
		_url = window.location.href.split('/')[0] + _url
	else if (_url.indexOf('://') < 0 )
		_url = window.location.href.split('://')[0] + '://' + _url

	//hash parse
	result.hash = ''
	if( 0 <= (hash = _url.indexOf('#')) ){
		result.hash = _url.substr(hash + 1)
		_url = _url.substr(0,hash)
	}

	//search parse
	result.query = {}
	result.search = ''
	if( 0 <= (search = _url.indexOf('?')) ){
		result.search = _url.substr(search)
		_url = _url.substr(0,search)
		search = result.search.substr(1).split('&')
		for (i = search.length - 1; i >= 0; i--) {
			query = search[i].split('=')
			result.query[decodeURIComponent(query[0])] = decodeURIComponent(query[1]) 
		}
	}

	//protocol parse
	_urls = _url.split('/')
	result.protocol = _urls[0]
	result.href = _url

	//host parse
	host = _urls[2].split('@')  // auth host eg rob:abcd1234@www.domain.com:80
	
	if(host.length === 1){
		result.host = host[0]
	}else{
		result.auth = host[0]
		auth = result.auth.split(':')
		result.user = auth[0]
		result.pass = auth[1] || ''
		result.host = host[1]
	}

	host = result.host.split(':')
	if(host.length > 1){
		result.hostname = host[0]
		result.port = host[1]
	}else{
		result.hostname = result.host
		result.port = result.protocol.toLowerCase() === 'https:' ? '443' : '80'
	}

	//path parse
	result.pathname = ''
	path = _urls.slice(3)
	if(path.length > 0){
		result.pathname = '/' + path.join('/')
	}
	return result
}

// module.exports = assign({ parse : parseUrl},parseUrl())
url = { parse : parseUrl }
if (typeof window !== 'undefined') {
	assign(url,parseUrl(window.location.href))
}
module.exports = url