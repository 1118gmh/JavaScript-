### Navigator对象

> window.navigator属性指向一个包含浏览器和系统信息的Navigator对象。
>
> 脚本通过这个属性了解用户的环境信息。

**Navigator对象的属性**

- Navigator.userAgent：返回浏览器User Agent字符串，表示浏览器的厂商和版本信息

  ```js
  //可以通过userAgent大致识别手机浏览器，方法就是测试是否包含mobi字符串。
  var ua = navigator.userAgent.toLowerCase();
  if (/mobi/i.test(ua)) {
    // 手机浏览器
  } else {
    // 非手机浏览器
  }
  ```

- Navigator.plugins：返回一个类似数组的对象，成员是Plugin实例对象，表示浏览器安装的插=件，比如Flash、ActiveX等

  ```js
  var pluginsLength = navigator.plugins.length;
  
  for (var i = 0; i < pluginsLength; i++) {
    console.log(navigator.plugins[i].name);
    console.log(navigator.plugins[i].filename);
    console.log(navigator.plugins[i].description);
    console.log(navigator.plugins[i].version);
  }
  ```

- Navigator.platform：返回用户的操作系统信息

  ```js
  navigator.platform
  //"Win32"
  ```

- Navigator.onLine：返回一个布尔值，表示用户当前是否在线

- Navigator.language / Navigator.languages：返回一个字符串，表示浏览器的首选语言 、 返回一个数组表示用户可以接收的语言

  ```js
  navigator.language // "zh-CN"
  navigator.languages //["zh-CN", "zh", "en"]
  ```

- Navigator.geolocation：返回Geolocation对象，包含用户的地理位置信息。（只在HTTPS协议下可用）

- Navigator.cookieEnable：返回布尔值，表示浏览器Cookie功能是否能打开。

  ```js
  navigator.cookieEnabled // true
  ```

**Navigator对象的方法**

- Navigator.javaEnabled()：返回一个布尔值，表示是否可以运行Java Applet小程序
- Navigator.sendBeacon()：

**Navigator的实验性属性**

> 只在部分浏览器可用

- Navigator.deviceMemory：
- Navigator.hardwareConcurrency
- Navigator.connection