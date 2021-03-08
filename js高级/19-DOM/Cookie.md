### Cookie

> Cookie是服务器保存在浏览器的一小段文本信息，大小不超过4KB。浏览器每次向服务器发送请求，就会自动那个附上这段信息。

**用途**

> - 对话管理：保存登录、购物车等需要记录的信息
> - 个性化信息：保存用户的偏好，比如网页的字体大小、背景色等。
> - 追踪用户：记录和分析用户行为。

**Cookie的元数据：**

> - Cookie的名字
> - Cookie的值
> - 到期时间
> - 所属域名
> - 生效的路径

**Cookie的生成：**

```
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
```

> 设置一个Cookie的各种数据

**Cookie的发送**

```
Cookie: name=value; name2=value2; name3=value3
```

> Cookie字段可以包含多个 Cookie，使用分号（`;`）分隔。
>
> 发送一个Cookie给服务器，服务器接收Cookie，此时服务器两点不知道：
>
> - Cookie的各种属性
> - Cookie的所属域名

**Cookie的属性**

- Expires / Max-Age

  > `Expires`属性表示这一个Cookie的到期时间。
  >
  > - 属性名：Expires
  > - 属性值：UTC格式的时间字符串（可以通过Date.prototype.toUTCString()转换）
  >
  > `Max-Age`属性表示从现在开始到这个Cookie存在的秒数。
  >
  > - 属性名：Max-Age
  > - 属性值：数字（表示多少秒）

- Domain / Path

  > `Domain`属性可以用于浏览器在发送Http请求时，设置Cookie的所属域名。（默认当前域名）
  >
  > `Path`属性可以用于在发送Http请求时，设置Cookie的所属路径。

- Secure / HttpOnly

  > `Secure`属性指定只在加密协议HTTPS，才能将Cookie发送到服务器。如果当前协议是 HTTP，浏览器会自动忽略服务器发来的`Secure`属性。该属性没有值。
  >
  > `HttpOnly`属性指定Cookie无法通过JavaScript脚本获取到。（即无法通过document.cookie属性、XMLHttpRequest对象、Request API等获取）（可以防止恶意脚本读取Cookie）

- SameSite

  > `SameSite`属性用来防止CSRF攻击和用户追踪。
  >
  > **CSRF攻击**：Cookie 往往用来存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求，这就是 CSRF 攻击。
  >
  > **用户追踪**：比如facebook在第三方网站插入看不见的图片`<img src="facebook.com" style="visibility:hidden;">`，当你点击到时，浏览器就会加载上面代码，就会向Facebook发送带有Cookie的请求，Facebook就会知道你是谁，访问了什么网站。
  >
  > **Cookie可以设置3个值**
  >
  > - Strict：完全禁止第三方Cookie
  >
  > - Lax：不发送第三方Cookie，除Get请求（Get请求包括链接、预加载、Get表单）
  >
  >   **请求类型：**
  >
  >   请求类型一共有7中，包括链接、预加载、Get表单、POST表单、iframe、AJAX、Image。设置了Lax后则POST表单、iframe、AJAX、Image这4中请求类型不会发送Cookie。
  >
  > - None：关闭SameSite属性。

**Cookie的读取和设置**

> 读取：

```js
document.cookie //读取当前网页的Cookie
```

> 设置

```js
//例
document.cookie = "foo=bar; expires=Fri, 31 Dec 2020 23:59:59 GMT";
document.cookie = 'fontSize=14; '
  + 'expires=' + someDate.toGMTString() + '; '
  + 'path=/subdirectory; '
  + 'domain=*.example.com';
```

> 删除

```js
//唯一方法:设置expires为一个过去的时间
document.cookie = 'fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT'; //删除名为fontSize的Cookie
```



