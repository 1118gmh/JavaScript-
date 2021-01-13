### String字符串数据类型

> 所有用单引号、双引号、反引号包起来的都是字符串
>
> 定义时的两种方式：（推荐第一种）
>
> - 基本包装类型：var testString = '小明'; 
> - 引用类型：var testString2 = new String('小明');
>
> **主要区别：对象的生存周期不同。（通过new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中；而自动创建的基本包装类型的对象，则只存在于一行代码执行的瞬间，然后立刻被销毁。这意味着我们不能再运行时添加属性和方法。）**
>
> ```js
> var testStr = "我是一个字符串";
> testStr.color = "我的附加的一个颜色值";
> console.log("testStr.color的值是：",testStr.color); //testStr.color的值是： undefined
> var testObj={};
> testObj.color = "我的附加的一个颜色值";
> console.log("testObj.color的值是：",testObj.color); //testObj.color的值是： 我的附加的一个颜色值
> ```
>
> Object构造函数也会像工厂方法一样，根据传入数值参数会得到对应的基本包装类型的实例
>
> ```js
> var obj = new Object("some text");
> console.log(obj instanceof String); //true
> ```
>
> 

1. 把其他类型值转换为字符串

- [val].toString

```js
let a = 12;
console.log(a.toString());//'12'
console.log((NaN).toString);//'NaN'

//null和undefined是禁止直接toString的
(null).toString //报错
//但是undefined一样转换为字符串的结果就是'null'/'undefined'

//普通对象.toString()的结果是"[Object Object]"

//Object.prototype.toString方法不是转换为字符串的，而是用来检测数据类型的。
```

2. 字符串拼接

> \+ ：加法、字符串拼接符号
>
> 没遇到字符串时，则进行数字加法运算；遇到字符串时，进行字符串拼接；

```js
console.log('10' + 10);//'1010'
console.log('10' - 10);//0
console.log('10px' - 10);//NaN
```

面试题：

```js
let a = 10 + true + null + [] + undefined + '珠峰' + null + [] + 10 + false;
console.log(a);
```

> 10+null -> 10+0 -> 10
>
> 10+true ->10+1 -> 11
>
> 11+[] -> 11+' ' -> '11'   //对象转换成数字要先转换成字符串
>
> '11'+... -> '11undefiened珠峰null10false'

3. 转义

> 反斜杠（\）在字符串内有特殊含义，用来表示一些特殊的字符，又称转义符。

> 如果在非特殊字符前面使用反斜杠，则反斜杠会被省略。

```js
\0 ：null（\u0000）
\b ：后退键（\u0008）
\f ：换页符（\u000C）
\n ：换行符（\u000A）
\r ：回车键（\u000D）
\t ：制表符（\u0009）
\v ：垂直制表符（\u000B）
\' ：单引号（\u0027）
\" ：双引号（\u0022）
\\ ：反斜杠（\u005C）
```

> 除了用来表示转义符，反斜杠还有其他三个用法：
>
> - \HHH
>
>   > 反斜杠后面紧跟三个八进制数（`000`到`377`），代表一个字符。`HHH`对应该字符的 Unicode 码点，比如`\251`表示版权符号。显然，这种方法只能输出256种字符。
>
> - \xHH
>
>   > `\x`后面紧跟两个十六进制数（`00`到`FF`），代表一个字符。`HH`对应该字符的 Unicode 码点，比如`\xA9`表示版权符号。这种方法也只能输出256种字符。
>
> - \uXXXX
>
>   > `\u`后面紧跟四个十六进制数（`0000`到`FFFF`），代表一个字符。`XXXX`对应该字符的 Unicode 码点，比如`\u00A9`表示版权符号。
>
> ```js
> '\251' // "©"
> '\xA9' // "©"
> '\u00A9' // "©"
> 
> '\172' === 'z' // true
> '\x7A' === 'z' // true
> '\u007A' === 'z' // true
> 
> '\a'
> // "a"
> ```
>
> 拓展：
>
> 1. 字符集
>
>    - js使用的是Unicode字符集。（Unicode是一种字符表现形式）
>    - js以Unicode存储字符，并且允许直接在程序中使用Unicode码点表示字符。（就是写成\uxxxx形式，其中xxxx表示的就是Unicode码点。比如\u00A9代表的就是版权符号"©"）
>    - js在解析代码的时候自动识别一个字符是字面量表示，还是Unicode形式表示。输出给用户时统一转换成字面量形式。
>    - js内部在存储字符时都是以UTF-16格式存储。（也就是说js每个字符占两个字节，16比特）
>    - 由于历史原因，js只支持两字节的字符，不支持四字节的字符。但是Unicode纳入了更多字符，出现了四字符的编码。但是js标准定性了，所以js无法识别四个字节的字符（浏览器可以正常识别），默认认为是两个字符。（2个字节字符的码点：U+0000到U+FFFF；四个字节字符的码点：U+10000到U+10FFFF）
>
> 2. Base64转码
>
>    - Base64是一种编码方法，可以将任意值转成0-9、A-Z、a-z、`+`和`/`这64个字符组成的可打印字符。
>    - 使用Base64编码方法，不是为了加密，而是为了不出现特殊字符，简化程序的处理。（应用场景：1、文本中包含一些不可打印的符号，比如ASCII码0-31的符号都无法打印。2、有时需要以文本格式传递二进制数据）
>
>    - js提供了两个Base64相关的方法：
>      - btoa：编码；任意值转为Base64编码
>      - atob：解码；Base64编码转为原来的值
>
>    ```js
>    var string = 'Hello World!';
>    btoa(string);//"SGVsbG8gV29ybGQh"
>    atob("SGVsbG8gV29ybGQh");//"Hello World!"
>    ```
>
>    > 这两个方法不适合非ASCII码的字符，会报错
>
>    ```js
>    btoa('你好') // 报错
>    ```
>
>    > 如果将非ASCII码字符转为Base64编码，得先转换，通过这两个方法：
>    >
>    > 扩展：URI：资源标志符(Uniform Resource Identifier， URI)，表示的是web上每一种可用的资源，如 HTML文档、图像、视频片段、程序等都由一个URI进行标识的。
>    >
>    > - encodeURIComponent（）：URI组件编码，函数通过将一个，两个，三个或四个表示字符的UTF-8编码的转义序列替换某些字符的每个实例来编码 [URI](https://wiki.developer.mozilla.org/en-US/docs/Glossary/URI) ，（简单来说就是编码URI，让其变为Base64可识别的字符）
>    > - decodeURIComponent（）：URI组件解码
>
>    ```js
>    /*
>     *b64Encode：编码，转换为Base64编码
>     *b64Decode：解码，将Base64转换为原来的值
>     *	@params [String]
>     *	@return [String]
>     *by gaominghui on 2020/10/30
>     */
>    function b64Encode(str){
>        return btoa(encodeURIComponent(str));
>    }
>    function b64Decode(str){
>        return decodeURIComponent(atob(str));
>    }
>    b64Encode('你好');//"JUU0JUJEJUEwJUU1JUE1JUJE"
>    b64Decode("JUU0JUJEJUEwJUU1JUE1JUJE");//"你好"
>    ```

**字符串中常用的方法**

```js
//字符串基础操作
let str = 'woshiyizhixiaoxiaoniao';
str.length //=>字符串长度
str[0] //=>获取索引为零的字符
str[str.length-1] //=>获取最后一个字符
str[1000] //=>undefined

//循环输出字符串中每个字符
for(let i = 0;i < str.length;i++){
	let char = str[i];
	console.log(char);
}
```

***查找方法***

1. fromCharCode(Unicode,Unicode,Unicode)

   > String对象提供的静态方法
   >
   > fromCharCode()：用Unicode创建一个字符串
   >
   > ​	@params	[Unicode]一个或多个Unicode值，即将要创建的字符传中的Unicode编码
   >
   > ​	@return	[String]

   ```js
   String.fromCharCode() // ""
   String.fromCharCode(97) // "a"
   String.fromCharCode(104, 101, 108, 108, 111)
   // "hello"
   
   //该方法不支持Unicode大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）。
   String.fromCharCode(0x20BB7)
   // "ஷ"
   String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)
   // true
   //上面代码中，String.fromCharCode参数0x20BB7大于0xFFFF，导致返回结果出错。0x20BB7对应的字符是汉字𠮷，但是返回结果却是另一个字符（码点0x0BB7）。这是因为String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位（即忽略0x20BB7里面的2）。
   
   //码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。
   String.fromCharCode(0xD842, 0xDFB7)
   // "𠮷"
   //码点大于0xFFFF的字符的四字节表示法，由 UTF-16 编码方法决定。
   ```

2. charAt(index)/ charCodeAt(index)

   > charAt：根据索引获取指定位置的字符
   >
   > charCodeAt：获取指定字符的ASII码值（Unicode编码）
   >
   > @params	
   >
   > ​	n [number]	获取祖父指定的索引
   >
   > @return	
   >
   > ​	charAt返回查找的字符，找不到则返回的是空字符串undefined	
   >
   > ​	charCodeAt返回的是对应的编码值

   ```js
   let str = 'woshiyizhixiaoxiaoniao';
   console.log(str.charAt(0)); //=>'w'
   console.log(str[0]); //=>'w'
   //使用charAt获取字符的方法比直接根据索引找好，好在当不存在的索引时返回的是空字符串
   console.log(str.charAt(1000)); //=>''
   console.log(str[1000]); //=>undefined
   
   console.log(str.charCodeAt(0)); //=>119
   console.log(String.fromCharCode(119)); //=>'w'
   ```

***操作方法***

1. substr / substring / slice

   > 都是为了实现字符串的截取（在原来字符串中找到自己想要的）
   >
   > substr(n,m)：从索引n开始截取m个字符，m不写截取到末尾（后面方法也是）
   >
   > substring(n,m)：从索引n开始找到索引m处（不含m）
   >
   > slice(n,m)：和substring一样，都是从n开始找到m处，但是slice可以支持负数作为索引，其余两个方法不可以的

   ```js
   let str = 'woshiyizhixiaoxiaoniao';
   console.log(str.substr(3,7)); //=>'hiyizhi'
   console.log(str.substring(3,7)); //=>'hiyi'
   console.log(str.substring(3,7)); //=>'hiyi'
   //substr和substring不支持负索引
   console.log(str.substring(-7,-3)); //=>''
   //slice支持负索引，按照str.length+负索引查找
   //slice(-7,-3)=>slice(-7+22,-3+22)=>slice(15,19)
   console.log(str.slice(-7,-3)); //=>'iaon'
   ```

***位置方法***

1. indexOf () / lastIndexOf() / includes

   > indexOf(x,y)：获取第一次出现的索引，y是控制查找的起始位置索引
   >
   > lastIndexOf(x)：获取最后一次出现的索引
   >
   > =>没有字符串，则返回的结果是-1
   >
   > includes(x)：判断字符串中是否包含字符x，返回值boolean

   ```js
   let str = 'woshiyizhixiaoxiaoniao';
   console.log(str.indexOf('x')); //=>10
   console.log(str.indexOf('x',11)); //=>14
   console.log(str.lastIndexOf('x')); //=>14
   console.log(str.indexOf('@')); //=>-1
   //验证整体第一次出现的位置，返回的是第一个字符所在位置的索引值
   console.log(str.indexOf('xiao')); //=>10
   if(str.includes('@')){
       console.log('包含@');
   }else {
       console.log('不包含@');
   }
   ```

***转换方法***

1. toUpperCase / toLowerCase

   > 字符串中字母的大小写转换
   >
   > toUpperCase()：转大写，不传参，返回转换后的字符串
   >
   > toLowerCase()：转小写，不传参，返回转换后的字符串

   ```js
   let str = 'woshiyizhixiaoxiaoniao';
   console.log(str.toUpperCase()); //=>'WOSHIYIZHIXIAOXIAONIAO'
   console.log(str.toLowerCase()); //=>woshiyizhixiaoxiaoniao
   //实现首字母大写
   str = str.substr(0,1).toUpperCase() + str.substr(1).toLowerCase();
   console.log(str); //=>'Woshiyizhixiaoxiaoniao'
   ```

***匹配方法***

>  与正则搭配使用,详情见正则。

1. split

   > split([分隔符])：把字符串按照指定的分隔符拆分成数组（和join对应）
   >
   > split支持传递正则表达式 

   ```js
   //把|分隔符变为，分隔符
   let str = 'wo|shi|yi|zhi|xiao|xiao|niao';
   let ary = str.split('|'); //=>["wo", "shi", "yi", "zhi", "xiao", "xiao", "niao"]
   str = ary.join();
   console.log(str); //=>'wo,shi,yi,zhi,xiao,xiao,niao
   undefined'
   ```

2. replace

   > replace(老字符，新字符)：实现字符串的替换（一般配合正则使用）

   ```js
   let str = '我是@一只@小小@鸟';
   //=>在不适用正则表达式的情况下，执行一次replace只能替换一次
   str = str.replace('@','-'); //=>"我是-一只@小小@鸟"
   str = str.replace(/@/g,'-'); //=>"我是-一只-小小-鸟"
   ```

3. search


***编码方法***

- 字符串常规编码与解码
  - escape()
  - unescape()
- URI字符串编码与解码
  - encodeURI
  - decodeURI
- URI组件编码与解码
  - encodeURIComponent()
  - decodeURIComponent()







**实现一些常用的需求**

- 时间字符串的处理

  ```js
  //=>变成自己需要呈现的格式，如：
  //=>2020年09月02日 09时46分44秒
  let time = '2020-9-2 9:46:44';
  //方案一：使用replace一个一个替换（麻烦）
  //方案二：基于indexOf获取指定符号的索引，再根据索引基于substring截取字符串拼接（麻烦）
  //方案三：基于split一项一项的拆分，获取每一项值进行拼接
  let ary = time.split(' '); //=>["2020-9-2", "9:46:44"]
  let ary1 = ary[0].split('-');//=>["2020", "9", "2"]
  let ary2 = ary[1].split(':'); //=>["9", "46", "44"]
  
  //箭头函数addZero：不足两位补0
  let addZero = val => val.length<2?val = '0'+val:null;
  
  time = ary1[0]+'年'+addZero(ary1[1])+'月'+addZero(ary1[2])+'日'; //=>"2020年09月02日"
  
  //基于split使用正则方法获取所有值
  let ary = time.split(/(?: |-|:)/g); //=>["2020", "9", "2", "9", "46", "44"]
  ```

  ```js
  //方案四：基于日期对象处理
  //箭头函数addZero：不足两位补0
  function addZero(val){
      val+='';
      return val.length<2?val = '0'+val:val;
  }
  
  /*
   *formatTime：对时间字符串格式化处理
   *@params
   *   time [string]类型字符串
   *@return
   *   格式化处理后的字符串
   */
  function formatTime(time){
      //1.把时间字符串变为标准日期对象
      time = new Date(time);
      //2.基于方法获取年月日等信息
      let year = time.getFullYear(),
          mouth = addZero(time.getMonth()+1),
          day = addZero(time.getDate()),
          hours = addZero(time.getHours()),
          minutes = addZero(time.getMinutes()),
          seconds = addZero(time.getSeconds());
      //3.返回想要的结果
      return year + '年' + mouth + '月' +day +'日 '+hours+':'+minutes+':'+seconds; 
  } 
  let time = '2020-9-2 12:0:0';
  time = formatTime(time);
  console.log(time); //=>2020年09月02日 12:00:00
  ```

  > 封装一套公共的时间字符串格式化处理的方式

  ```js
  String.prototype.formatTime = function formatTime(template){
  	//初始化模板
  	typeof template==='undefined'?template = "{0}年{1}月{2}日 {3}:{4}:{5}":null;
      //this:我们要处理的字符串
      //获取日期字符串中的数字信息
      let matchAry = this.match(/\d+/g);
      
      //模板和数据的渲染（引擎机制）
      template = template.replace(/\{(\d+)\}/g,(x,y) => {
          let val = matchAry[y] || '00';
          val.length <2 ? val = '0' +val:null;
          return val;
      });
      return template;
  }
  let time = '2020-9-2 12:0:0';
  console.log(time.formatTime("{1}-{2} {3}:{4}"));//=>09-02 12:00
  ```

- 实现queryURLParams

  > 获取一个URL地址**问号**后面传递的参数信息

  ```js
  let url = 'http://www.zhufengpeixun.cn/index.html?lx=1&name=zhufeng&teacher=aaa#box';
  /*
   *结果：{
   *   lx:1,
   *   name:'zhufeng',
   *	 teacher:'aaa',
   *   HASH:'box'
   * }
   */
  //1. 获取问好后面的值
  let askIndex = url.indexOf('?');
  let wellIndex = url.indexOf('#');
  let askText = url.substring(askIndex+1,wellIndex);
  let wellText = url.substring(wellIndex+1);
  //2. 问好后面值得详细处理
  let result = {};
  let askAry = askText.split('&'); //["lx=1", "name=zhufeng", "teacher=aaa"]
  askAry.forEach(item => {
      let n = item.split('=');
      let key = n[0];
      let value = n[1];
      result[key] = value;
  });
  result['HASH'] = wellText;
  console.log(result); //=>{lx: "1", name: "zhufeng", teacher: "aaa", HASH: "box"}
  ```

  > 代码的优化：对代码进行封装，并判断不同情况

  ```js
  /*
   *queryURLParams获取URL地址中问号传参的信息和哈希值
   *@params
   *	url	[string]要解析的url字符串
   *@return
   *	[object]包含参数和哈希值信息的对象
   *by gaominghui on 2020/09/02 11:11:11
   */
  function queryURLParams(url){
      //1.获取？#后面的信息
      let askIndex = url.indexOf('?'),
          wellIndex = url.indexOf('#'),
          askText = '',
          wellText = '';
      //#不存在
      wellIndex ===-1?wellIndex = url.length : null;
      //?存在
      askIndex >=0 ?askText = url.substring(askIndex+1,wellIndex):null;
      wellText = url.substring(wellIndex+1);
      //获取每一部分信息
      let result = {};
      wellText!==''?result['HASH']=wellText:null;
      if(askText !==''){
      	let ary = askText.split('&');
          ary.forEach(item =>{
              let n = item.split('=');
              let key = n[0];
              let value = n[1];
              result[key] = value;
          });
      }
      return result;
  }
  let url = 'http://www.zhufengpeixun.cn/index.html?lx=1&name=zhufeng&teacher=aaa#box';
  console.log(queryURLParams(url)); //=>{HASH: "box", lx: "1", name: "zhufeng", teacher: "aaa"}
  ```

  > 基于正则封装函数，实现queryURLParams函数功能：

  ```js
  function queryURLParams(url){
  	let result = {},
  		reg1 = /([^?=&#]+)=([^?=&#]+)/g,
  		reg2 = /#([^?=&#]+)/g;
  	url.replace(reg1,(n,x,y) => result[x] = y);
  	url.replace(reg2,(n,x) => result['HASH'] = x);
  	return result;
  }
  ```

- 实现一个LOW的验证码：数字+字母供四位

  > 验证码目的：防止外挂程序恶意批量注入的

  ```js
  let codeInp = document.getElementById('codeInp'),
      codeBox = document.getElementById('codeBox');
  	changeCode = document.getElementById('changeCode');
  
  /* 
      *queryCode：获取四位随机的验证码，然后放到盒子里
      *@params
      *@return
      *by gaominghui on 2020/09/02
      */
  function queryCode() {
      //准备获取范围的字符串
      let area = 'ABCDEFGHIGKLMNOPQRSTUNWXYZabcdifghijklmnopqrstunwxyz1234567890';
      let result = '';
      for (let i = 0; i < 4; i++) {
          let randomIndex = Math.random() * 61;
          result += area.charAt(randomIndex);
      }
      //放到盒子里
      codeBox.innerHTML = result;
  }
  //第一次加载页面需要执行方法，让其显示在页面中
  queryCode();
  
  //点击看不清按钮，需要重新获取新的验证码
  changeCode.onclick = queryCode;
  
  //文本框失去焦点时，验证用户输入的验证码是否相同，给与相关提示，如果不一样需要重新生成验证码
  //文本框失去焦点事件
  codeInp.onblur = function() {
      //获取用户和验证码内容：表单元素用value，非表单元素用innerHTML
      let val = codeInp.value,
          code = codeBox.innerHTML;
      //不区分大小写验证：都转换为小写
      if (val.toLowerCase() === code.toLowerCase()) {
          alert('温馨提示：验证码输入成功');
      } else {
          alert('温馨提示：验证码错误，请重试');
          codeInp.value = '';
          queryCode();
      }
  }
  ```

  