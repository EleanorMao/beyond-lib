v0.6.2
修复cookie的时间设置bug

v0.6.0

增加以下功能接口

- dateDiff
- encodeHTML
- decodeHTML
- namespace
- klass


url 解析升级

- url上如果不存在 ? 和 #，则 search 和 hash 返回null
- 移除 protocol 末尾的 ':' ，search首位的 '?'，hash首位的 '#'
- 移除解析返回的href属性，增加url和origin


v0.5.1

- 修复npm版本号和官网问题


v0.5.0 

- 更新 url.parse 返回的hash，不包含 # 符号 
- 修复 dateFormat ，年份不再返回1位或者3位 
- 更新 storage ，不对url做检测，移除部分不用的api 
- 更新 browser 检测，支持 Edge 浏览器 



