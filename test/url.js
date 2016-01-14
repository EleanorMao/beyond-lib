var commom_url = 'http://rob:abcd1234@www.domain.com:3000/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';
var urlHttps = 'https://www.domain.com/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';
var urlIp = 'http://rob:abcd1234@1.2.3.4/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese';
var url = beyondlib.url;
    var url1 = url.parse(commom_url)
    var url2 = url.parse(urlHttps)
    var url3 = url.parse(urlIp)
    describe("location test", function() {
    
      it("should equal location url", function() {
        expect(url.url).toEqual(location.href);
      });
    
      it("should equal location port ", function() {
          expect(url.port).toEqual(+location.port);
      });
      it('should equal location protocol', function() {
        expect(url.protocol).toEqual(location.protocol.slice(0,-1));
      });
      it('should equal location pathname', function() {
        expect(url.pathname).toEqual(location.pathname);
      });
    });


    describe('pathname test', function() {
      it('should work well', function() {
        
        expect( url.parse('http://www.domain.com/first/second' ).pathname).toEqual('/first/second' );
        expect( url.parse('http://www.domain.com/first/second/' ).pathname).toEqual('/first/second/' );
        expect( url.parse('http://www.domain.com:8080/first/second' ).pathname).toEqual('/first/second' );
        expect( url.parse('http://www.domain.com:8080/first/second/' ).pathname).toEqual('/first/second/' );
        expect( url.parse('http://www.domain.com/first/second?test=foo1#hash' ).pathname).toEqual('/first/second' );
        expect( url.parse('http://www.domain.com/first/second/?test=foo2' ).pathname).toEqual('/first/second/' );
        expect( url.parse('http://www.domain.com/path#anchor' ).pathname).toEqual('/path' );
        expect( url.parse('http://www.domain.com/path/#anchor' ).pathname).toEqual('/path/' );
        expect( url.parse('http://www.domain.com' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com/' ).pathname).toEqual('/' );
        expect( url.parse('http://www.domain.com#anchor' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com/#anchor' ).pathname).toEqual('/' );
        expect( url.parse('http://www.domain.com?test=foo3' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com/?test=foo4' ).pathname).toEqual('/' );
        expect( url.parse('http://www.domain.com:80' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com:80/' ).pathname).toEqual('/' );
        expect( url.parse('http://www.domain.com:80#anchor' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com:80/#anchor' ).pathname).toEqual('/' );
        expect( url.parse('http://www.domain.com:80?test=foo5' ).pathname).toEqual('' );
        expect( url.parse('http://www.domain.com:80/?test=foo6' ).pathname).toEqual('/' );
      });

    });

    describe('hash test', function() {
      it('should work well', function() {
        expect( url.parse('http://www.domain.com/first/second?test=foo1' ).hash).toEqual(null);
        expect( url.parse('http://www.domain.com/first/second?test=foo1#' ).hash).toEqual('' );
        expect( url.parse('http://www.domain.com/first/second?test=foo1#hash' ).hash).toEqual('hash' );
        expect( url.parse('http://www.domain.com/path#anchor' ).hash).toEqual('anchor' );
        expect( url.parse('http://www.domain.com/path/#anchor' ).hash).toEqual('anchor' );
        expect( url.parse('http://www.domain.com#anchor' ).hash).toEqual('anchor' );
        expect( url.parse('http://www.domain.com/#anchor' ).hash).toEqual('anchor' );
        expect( url.parse('http://www.domain.com:80#anchor' ).hash).toEqual('anchor' );
        expect( url.parse('http://www.domain.com:80/#anchor' ).hash).toEqual('anchor' );
      });
    });

    describe('search test', function() {

      it('should work well', function() {
        expect(url.parse('http://www.domain.com/first/second').search).toEqual(null);
        expect(url.parse('http://www.domain.com/first/second?').search).toEqual('');
        expect(url1.search).toEqual('query1=test&silly=willy')
        expect(url2.search).toEqual('query1=test&silly=willy')
        expect(url3.search).toEqual('query1=test&silly=willy')
      }); 
    });

    describe('query test', function() {

      it('should work well', function() {
        expect(url.parse('http://www.domain.com/first/second').query).toEqual({});
        expect(url.parse('http://www.domain.com/first/second?').query).toEqual({});
        expect(url.parse('http://www.domain.com/first/second?a=').query).toEqual({a:''});
        expect(url.parse('http://www.domain.com/first/second?a').query).toEqual({a:''});
        expect(url1.query.query1).toEqual('test')
        expect(url2.query.query1).toEqual('test')
        expect(url3.query.query1).toEqual('test')
      }); 
    });

    describe('host test', function() {

      it('should work well', function() {
        expect(url1.host).toEqual('www.domain.com:3000')
        expect(url2.host).toEqual('www.domain.com')
        expect(url3.host).toEqual('1.2.3.4')
      }); 
    });

    describe('hostname test', function() {

      it('should work well', function() {
        expect(url1.hostname).toEqual('www.domain.com')
        expect(url2.hostname).toEqual('www.domain.com')
        expect(url3.hostname).toEqual('1.2.3.4')
      }); 
    });

    describe('port test', function() {

      it('should work well', function() {
        expect(url1.port).toEqual(3000)
        expect(url2.port).toEqual(443)
        expect(url3.port).toEqual(80)
      }); 
    });

    describe('protocol test', function() {

      it('should work well', function() {
        expect(url1.protocol).toEqual('http')
        expect(url2.protocol).toEqual('https')
        expect(url3.protocol).toEqual('http')
      }); 
    });
    describe('auth test', function() {

      it('should work well', function() {
        expect(url1.auth).toEqual('rob:abcd1234')
        expect(url2.user).toEqual(null)
        expect(url3.user).toEqual('rob')
        expect(url3.pass).toEqual('abcd1234')
      }); 
    });
