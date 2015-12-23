# beyond lib
从原先版本的 beyond 库中分离出来的函数库，当前版本包括以下几个部件：

1. browser
2. dateFormat
3. eventHelper
4. storage 
5. url
6. extend

## 安装
```
npm install beyond-lib --save
```

## 使用方式

es5模式
```javascript
//方式一
var beyondLib = require('beyond-lib')
var storage = beyondLib.storage

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