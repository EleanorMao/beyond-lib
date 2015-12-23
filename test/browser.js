  describe("browser detect", function() {
    
    var browser = beyondlib.browser;
    // var browser = require('../../src/libs/browser')
    it("should be work in this browser", function() {
      // player.play(song);
      var ua = navigator.userAgent;

      // console.log($.browser.parse(ua));
      var o =browser.parse(ua);
      expect(o.name).toEqual(browser.name);
      expect(o.version).toEqual(browser.version);
      expect(o.device).toEqual(browser.device);
      expect(o.platform).toEqual(browser.platform);
    });
    it("should be chrome 39", function() {
      // player.play(song);
      var chrome39 = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36";
      // console.log($.browser.parse(ua));
      var o =browser.parse(chrome39);
      expect(o.name).toEqual('Chrome');
      expect(o.version).toEqual('39.0.2171.71');
      expect(o.isChrome).toEqual(true)
    });
    it("should be IE 11", function() {
      var ie11 ="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E; rv:11.0) like Gecko";
      var o = browser.parse(ie11);
      expect(o.name).toEqual('IE');
      expect(o.version).toEqual('11.0');
  
      expect(o.isIE11).toEqual(true);
      // player.play(song);
        // expect(foo).toEqual(bar);
  
    });
  
    it("should be IE 10.0", function() {
      var ie10 = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)";
      var o = browser.parse(ie10)
      expect(o.name).toEqual('IE');
      expect(o.version).toEqual('10.0');

      expect(o.isIE10).toEqual(true)
      // player.play(song);
        // expect(foo).toEqual(bar);
  
    });
    it("should be IE 9.0", function() {
      var ie = 'Mozilla/5.0 (Windows; U; MSIE 9.0; Windows NT 9.0; en-US)'
      var o = browser.parse(ie)
      expect(o.name).toEqual('IE');
      expect(o.version).toEqual('9.0');
      expect(o.isIE9).toEqual(true)
      // player.play(song);
        // expect(foo).toEqual(bar);
    
    });

    it("should be Firefox 33.0", function() {
      var firefox = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0";
      var o = browser.parse(firefox);
      expect(o.name).toEqual('Firefox');
      expect(o.version).toEqual('33.0');
      expect(o.isFirefox).toEqual(true);
      // player.play(song);
        // expect(foo).toEqual(bar);
  
    });

    it("should be Edge", function() {
      var edge = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246";
      var o = browser.parse(edge);
      expect(o.name).toEqual('Edge');
      expect(o.version).toEqual('12.246');
      expect(o.isEdge).toEqual(true);    
    });

    
  });