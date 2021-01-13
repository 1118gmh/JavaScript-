## js Google对象

### 全局对象

> 也叫global对象，意思是这个对象里面的函数都是全局可以直接使用的函数

- isNaN()

- isFinite()

- parseInt() / parseFloat()

- encodeURI / encodeURIComponent()

  ```js
  var uri1 = "http://www.wrox.com/illegal value.htm#start";
  var uri2 = "https://www.google.com.hk/webhp?tab=Tw";
  console.log(encodeURI(uri1));//http://www.wrox.com/illegal%20value.htm#start
  console.log(encodeURI(uri2));//https://www.google.com.hk/webhp?tab=Tw
  console.log(encodeURIComponent(uri1));//http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
  console.log(encodeURIComponent(uri2));//https%3A%2F%2Fwww.google.com.hk%2Fwebhp%3Ftab%3DTw
  ```

  > **encodeURI() 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 encodeURIComponent() 则会对它发现的任何非标准字符进行编码。**

- decodeURI() / decodeURIComponent()

  ```js
  var uri1 = "https%3A%2F%2Fwww.google.com.hk%2Fwebhp%3Ftab%3DTw";
  var uri2 = "http://www.wrox.com/illegal%20value.htm#start";
  console.log(decodeURI(uri1));//https%3A%2F%2Fwww.google.com.hk%2Fwebhp%3Ftab%3DTw
  console.log(decodeURIComponent(uri1));//https://www.google.com.hk/webhp?tab=Tw
  console.log(decodeURI(uri2));//http://www.wrox.com/illegal value.htm#start
  console.log(decodeURIComponent(uri2));//http://www.wrox.com/illegal value.htm#start
  ```

  > decodeURI() 只能对使用 encodeURI() 替换的字符进行解码,decodeURIComponent可以解析encodeURI的。

- eval()

  > eval()方法就像一个完整的ECMAScript解析器，它只接受一个参数，即要执行的ECMAScript（或JavaScript）字符串。

  ```js
  eval("console.log('test name')");//"test name"
  var msg = "hello world";
  eval("console.log(msg)");//"hello world"
  ```

  > 在eval()中创建的任何变量都不会被提升，因为在解析代码的时候，它们被包含在字符串中；只有在eval()执行的时候创建。

  ```js
  console.log(msg);//undefined
  eval("var msg = 'hello world'");
  console.log(msg);//"hello world"
  ```

  > 严格模式下，外部访问不到eval()中创建的任何变量或函数，因此上面会报错。

  **json字符串，转为json对象**

  ```js
  var myJSONText = '{"bindings": [{"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"},{"ircEvent": "PRIVMSG", "method": "deleteURI", "regex": "^delete.*"},{"ircEvent": "PRIVMSG", "method": "randomURI", "regex": "^random.*"}]}';
  console.log(typeof myJSONText);//string
  var testJSONObject=eval("("+myJSONText+")");
  console.log(typeof testJSONObject);//Object
  console.log(testJSONObject.bindings);
  ```

  

- setTimeout() / setInterval() / clearTimeout() / clearInterval()

