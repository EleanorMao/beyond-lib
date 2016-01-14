var assign = require('./assign')

var ports = {
	'https' : 443,
	'http' : 80
}

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
	this.query = {}
	this.pathname = null
	this.url = null
	this.origin = null
}

function isBrowser(){
	return typeof window !== 'undefined'
}

function parseUrl (url) {
	var urls,result,host,auth,i,path,search,query,hash
	result = new Url()
	if (!url && isBrowser()) {
		url = window.location.href
	}
	if (url == null) {
		return result
	}
	result.url = url

	//protocol fixed,such as  //cdn.com/jquery.js
	if (isBrowser()) {
		if(url.indexOf('//') === 0) {
			url = window.location.href.split('/')[0] + url
		} else if (url.indexOf('://') < 0 ){
			url = window.location.href.split('://')[0] + '://' + url
		}
	}

	//hash parse
	// result.hash = ''
	if(0 <= (hash = url.indexOf('#'))){
		result.hash = url.substring(hash + 1)
		url = url.substring(0,hash)
	}

	//search parse
	if(0 <= (search = url.indexOf('?'))){
		result.search = url.substring(search + 1)
		url = url.substring(0,search)
		if (result.search) {
			search = result.search.split('&')
			for (i = search.length - 1; i >= 0; i--) {
				query = search[i].split('=')
				result.query[decodeURIComponent(query[0])] = decodeURIComponent(query[1] || '') 
			}
		}
	}

	//protocol parse
	urls = url.split('/')
	result.protocol = urls[0].toLowerCase().replace(/:$/,'')

	//host parse
	host = urls[2].split('@')  // auth host eg rob:abcd1234@www.domain.com:80
	
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
		result.port = +host[1]
	}else{
		result.hostname = result.host
		result.port = ports[result.protocol] || null
	}

	//path parse
	result.pathname = ''
	path = urls.slice(3)
	if(path.length > 0){
		result.pathname = '/' + path.join('/')
	}

	//origin
	
	// result.origin = `${result.protocol || ''}://${result.host}`
	result.origin = result.host
	if (result.protocol) {
		result.origin = result.protocol + '://' + result.origin
	}
	return result
}

// module.exports = assign({ parse : parseUrl},parseUrl())
var url = { parse : parseUrl }
if (typeof window !== 'undefined') {
	assign(url,parseUrl(window.location.href))
}
module.exports = url