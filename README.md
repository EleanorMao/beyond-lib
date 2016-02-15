# beyond lib
从原先版本的 beyond 库中分离出来的函数库，当前版本包括以下几个部件：

- assign
- browser
- dateDiff
- dateFormat
- htmlHelper
- klass
- namespace
- storage
- url

## 安装
```
npm install beyond-lib --save
```

## 浏览器兼容性
IE8+,Firefox 和 Chrome 最新版本

## 使用方式

es5模式
```javascript
//方式一
var beyondlib = require('beyond-lib')
var storage = beyondlib.storage

//方式二 推荐，避免全局加载
var storage = require('beyond-lib/lib/storage')
```

es6
```javascript
//方式一
import {storage} from 'beyond-lib'
//方式二 推荐，避免全局加载
import storage from 'beyond-lib/lib/storage'
```

## 文档

### assign
```javascript
var assign = require('beyond-lib/lib/assign')
var obj = assign({},{bar : 1},{foo : 2})  // obj equals {bar : 1 , foo :2}
```

### browser detect

浏览器探测，如果当前环境是浏览器的话，则browser对象包含parse返回后的信息
```javascript
var browser = require('beyond-lib/lib/browser')

var info = browser.parse(userAguent)

info.isIE   //boolean
info.isIE8  //boolean
info.isIE9  //boolean
info.isIE10  //boolean
info.isIE11  //boolean
info.isIE678  //boolean
info.isEdge  //boolean
info.isChrome  //boolean
info.isFirefox  //boolean
info.isSafari  //boolean
info.isMicroMessenger //boolean 是否微信浏览器
info.name //browser name  like 'Chrome' , 'Firefox' , 'IE' ,'Opera' , 'Safari' , 'Edge'
info.version //browser version
info.Windows  //boolean
info.Mac  //boolean
info.iPhone  //boolean
info.iPad  //boolean
info.iPod  //boolean
info.Andriod  //boolean
info.Linux  //boolean
```

### dateDiff

返回两个时间点之间的时间间隔,如果第一个参数代表的时间晚于第二个参数，返回正数，相等返回0，否则返回负数

```javascript
var dateDiff = require('beyond-lib/lib/dateDiff')
dateDiff.years(new Date(2008,01,01),new Date(2006,02,01))  // return 2
dateDiff.years(1170259200000,1141142400000)  // return 1
dateDiff.years(new Date(2006,01,01),new Date(2008,02,01))  // return -2
dateDiff.years(+new Date(2007,01,01),new Date(2007,02,01))  // return 0
dateDiff.years(+new Date(2007,01,01),new Date(2007,02,01))  // return 0

dateDiff.months(date1,date2)
dateDiff.months(timestamp1,timestamp2)
dateDiff.months(date1,timestamp2)

dateDiff.days(date1,date2)
dateDiff.hours(date1,date2)
dateDiff.minutes(date1,date2)
dateDiff.seconds(date1,date2)

```

### dateFormat

返回格式化后的日期时间字符串

```javascript 
var dateFormat = require('beyond-lib/lib/dateFormat')
dateFormat()  // 2014.02.01
dateFormat('yyyy')  // 返回当前时间戳的 2014格式
dateFormat(new Date(2000,00,01,12,12))  // 返回该时间戳的默认日期 2000.01.01
dateFormat('yyyy',+new Date(2000,01,01))   // 2000
```

| 类型 | 说明   |  
| -----| -----  | 
| yyyy | 4位数年份 |  
| yy   | 2位数年份   | 
| MM   | 2位数月份，如果是个位则前置0 |  
| M    | 月份 |  
| dd   | 2位数日期，不足前置0 |  
| d    | 日期 |  
| HH   | 2位数24制小时，不足2位前置0 |
| H    | 24制小时 |
| hh   | 2位数12制小时，不足2位前置0 |
| h    | 12制小时 |  
| mm   | 2位数分钟，不足前置0 |
| m    | 分钟 |  
| ss   | 2位数秒，不足前置0 |
| s    | 秒 |  
| S    | 毫秒 |  
| u    | 星期几，0-6,0表示周日 |  


### htmlHelper
```javascript
var htmlHelper = require('beyond-lib/lib/htmlHelper')
htmlHelper.encodeHTML('<a href="#">hello&\'quote\'</a>')
htmlHelper.decodeHTML('&lt;a href=&quot;#&quot;&gt;hello&amp;&#039;quote&#039;&lt;/a&gt;')
```

### klass

用于模拟传统面向对象的方式构建 javascript 类
```javascript
var klass = require('beyond-lib/lib/klass')

var Person = klass({
	name : '',
	//构造函数
	constructor(name){
		this.name = name
	},
	say : function(){
		return 'hello'
	},

	//定义静态属性，不可继承
	Static : {
		type : 'human',
		sex : ['male','female']
	},

	//mixins 插入方法，可以继承
	Mixins : [{
		play : function(){}	
	},{
		walk : function(){}
	}]
})

var Man = Person.extend({
	sex : 'man',
	age : 0
	constructor(name,age){
		//使用当前类的upper方法调用父类构造函数
		Man.upper(this,arguments)
		this.age = age
	},
	say : function(){
		//使用当前类的upper方法调用父类的say方法
		return Man.upper(this,arguments,'say') + ' woman'
	}
})
Person.type  //human

var one = new Person('one')
one.say()  //hello
var jack = new Man('jack',18)
jack.say()  //hello woman
```

### namespace
命名空间
```javascript
var namespace = require('beyond-lib/lib/namespace')
var app = {}
app.namespace = namespace
app.namespace('a.b.c',function(){
	return 1
})
app.namespace('a.b.d',{
	a : 1 ,
	b : 2,
	c : 3
})

var app2 = {}
namespace(app2,'a.b.e',function(){
	return 1
})

namespace(app2,'a.b.f',{a : 1,b : 2 ,f : 3})

app.a.b.c  // 1
app.a.b.d  // {a:1,b:2,c:3}
app2.a.b.e // 1
app2.a.b.f // {a : 1,b : 2 ,f : 3}
```

### storage
浏览器本地存储，包括 localStorage 和 cookie

```javascript
var storage = require('beyond-lib/lib/storage')

//localstorage
storage.set('key',{value : 'value'})
storage.get('key')

//cookie,expire 单位为天
storage.setCookie('key','value')
storage.setCookie('key','value',expire,path,domain,secure)
storage.getCookie('key')
```

### url
url解析，如果是浏览器环境，url对象包含 parse(location.href) 返回后的信息

```javascript
var url = require('beyond-lib/lib/url')

var info = url.parse('http://rob:abcd1234@1.2.3.4:9090/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese')
info.protocol   // http
info.auth       // rob:abcd1234
info.user 		// rob
info.pass 		// abcd1234
info.host 		// 1.2.3.4:9090
info.port  		// 9090
info.hostname   // 1.2.3.4
info.hash  		// test=hash&chucky=cheese
info.search 	// ?query1=test&silly=willy
info.query 		// {query1 : 'test' , silly : 'willy'}
info.pathname   // /path/index.html
info.url 		// http://rob:abcd1234@1.2.3.4:9090/path/index.html?query1=test&silly=willy#test=hash&chucky=cheese
```