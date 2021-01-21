### Location对象

> Location对象是浏览器提供的原生额对象，提供URL相关的信息和操作方法。
>
> 通过window.location和document.location属性，都可以拿到这个对象

**属性**

- Location.href：整个URL
- Location.protocol：当前URL协议
- Location.host：主机
- Location.hostname：主机名
- Location.port：端口号
- Location.pathname：URL的路径部分，从根路径`/`开始
- Location.search：查询字符串部分，从`?`开始
- Location.hash：片段字符串部分，从#开始
- Location.username：域名前面的用户名。
- Location.password：域名前面的密码
- Location.origin：URL的协议、主机名和端口。(只读，其他的都可写)

```js
// 当前网址为
// http://user:passwd@www.example.com:4097/path/a.html?x=111#part1
document.location.href
// "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
document.location.protocol
// "http:"
document.location.host
// "www.example.com:4097"
document.location.hostname
// "www.example.com"
document.location.port
// "4097"
document.location.pathname
// "/path/a.html"
document.location.search
// "?x=111"
document.location.hash
// "#part1"
document.location.username
// "user"
document.location.password
// "passwd"
document.location.origin
// "http://user:passwd@www.example.com:4097"
```

**方法**

- Location.assign()：接收一个URL字符串作为参数，跳转到新的URL。
- Location.replace()：接收一个URL字符串作为参数，跳转到新的URL（替换当前网页）。
- Location.reload()：重新加载当前网页
- Location.toString()：返回整个URL字符串，相当于读取href属性