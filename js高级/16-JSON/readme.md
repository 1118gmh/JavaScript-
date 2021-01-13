### JSON格式

> **json格式是一种用于数据交换的文本格式**
>
> 目的是取代繁重的XML格式
>
> json对值的类型和格式有严格的规定
>
> - **符合类型的值只能是数组或对象，不能是函数、正则、日期对象**
> - **原始类型值只有四种：字符串、数值（必须十进制）、布尔和null**（不能使用NaN、undefined、Infinity、-Infinity）
> - **字符串必须使用双引号表示**
> - **对象的键名必须放在双引号里面**
> - **数组或对象最后一个成员的后面，不能加逗号**

```json
//合法的
["one","two","three"]
{"one":1,"two":2,"three":3}
{"names":["张三","李四"]}
[{"name":"张三"},{"name":"李四"}]
//非法的
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号
[32, 64, 128, 0xFFF] // 不能使用十六进制值
{ "name": "张三", "age": undefined } // 不能使用 undefined
{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象
```

### JSON对象

> JSON对象是js的原生对象，用来处理JSON格式数据。
>
> 两个静态方法：
>
> - **JSON.stringify()**：将一个值转为JSON字符串
>
>   **第一个参数**：接收一个json格式的值
>
>   ```js
>   JSON.stringify('abc') // ""abc""
>   JSON.stringify(1) // "1"
>   JSON.stringify(false) // "false"
>   JSON.stringify([]) // "[]"
>   JSON.stringify({}) // "{}"
>   
>   JSON.stringify([1, "false", false])
>   // '[1,"false",false]'
>   
>   JSON.stringify({ name: "张三" })
>   // '{"name":"张三"}'
>   ```
>
>   > 如果对象的属性是`undefined`、函数或 XML 对象，该属性会被`JSON.stringify()`过滤。
>
>   ```js
>   var obj = {
>       a:undefined,
>       b:function(){}
>   };
>   JSON.stringify(obj);//"{}"
>   ```
>
>   > 如果数组的成员是`undefined`、函数或 XML 对象，则这些值被转成`null`。
>
>   ```js
>   var arr = [undefined,function(){}];
>   JSON.stringify(arr);"[null,null]"
>   ```
>
>   > `JSON.stringify()`方法会忽略对象的不可遍历的属性。
>
>   ```js
>   var obj = {};
>   Object.defineProperties(obj,{
>       'foo':{
>           value:1,
>           enumerable:true
>       },
>       'bar':{
>           value:2,
>           enumerable:false
>       }
>   });
>   JSON.stringify(obj);//"{"foo":1}"
>   ```
>
>   **第二个参数**：可以接收一个数组，指定要转换成字符串的属性（第一个参数是对象才有用）
>
>   ```js
>   var obj = {
>     'prop1': 'value1',
>     'prop2': 'value2',
>     'prop3': 'value3'
>   };
>   var selectedProperties = ['prop1', 'prop2'];
>   JSON.stringify(obj, selectedProperties)
>   // "{"prop1":"value1","prop2":"value2"}"
>   ```
>
>   **第二个参数**：还可以是一个函数，用来更改`JSON.stringify()`的返回值。
>
>   ```js
>   function f(key,value){
>       if(typeof value === "number"){
>           value = value*2;
>       }
>       return value;
>   }
>   JSON.stringify({a:1,b:2,c:'xiaoming'},f);//"{"a":2,"b":4,"c":"xiaoming"}"
>   //上面代码中的f函数，接受两个参数，分别是被转换的对象的键名和键值。如果键值是数值，就将它乘以2，否则就原样返回。
>   ```
>
>   ```js
>   var obj = {a: {b: 1}};
>   
>   function f(key, value) {
>     console.log("["+ key +"]:" + value);
>     return value;
>   }
>   
>   JSON.stringify(obj, f)
>   // []:[object Object]
>   // [a]:[object Object]
>   // [b]:1
>   // '{"a":{"b":1}}'
>   ```
>
>   > 上面代码中，对象`obj`一共会被`f`函数处理三次，输出的最后那行是`JSON.stringify()`的默认输出。第一次键名为空，键值是整个对象`obj`；第二次键名为`a`，键值是`{b: 1}`；第三次键名为`b`，键值为1。
>
>   > 递归处理中，每一次处理的对象，都是前一次返回的值。
>
>   ```js
>   var obj = {a: 1};
>   
>   function f(key, value) {
>     if (typeof value === 'object') {
>       return {b: 2};
>     }
>     return value * 2;
>   }
>   
>   JSON.stringify(obj, f)
>   // "{"b": 4}"
>   ```
>
>   如果处理函数返回`undefined`或没有返回值，则该属性会被忽略。
>
>   **第三个参数**：用于增加返回的JSON字符串的可读性。
>
>   可以是'\t'等字符，可以是数字，表示每个属性前空几个空格。
>
>   ```js
>   //默认输出
>   JSON.stringify({p1:1,p2:2});
>   //{"p1":1,"p2":2}
>   console.log(JSON.stringify({ p1: 1, p2: 2 }, null, '\t'));
>   //{
>   //	"p1": 1,
>   //	"p2": 2
>   //}
>   ```
>
>   **toJSON()方法**：如果对象中自定义了toJSON()方法，那么在使用JSON.stringify()时会使用toJSON()方法的返回值作为参数，而忽略原对象的其他属性。
>
>   ```js
>   var user = {
>       firstName: "小",
>       secondName: "明",
>       toJSON: function() {
>           return {
>               name: this.firstName + this.secondName
>           };
>       }
>   };
>   console.log(JSON.stringify(user));
>   //{"name":"小明"}
>   //直接使用toJSON方法返回的对象，将其转换为JSON字符串，忽略其他属性
>   
>   //=>Date对象中自带一个toJSON方法。
>   var time = new Date("2020-11-22");
>   console.log(JSON.stringify(time));//"2020-09-11T00:00:00.000Z"
>   
>   //正则无toJSON方法
>   var reg = /\d/g;
>   console.log(JSON.stringify(reg));//{}
>   //设置toJSON方法
>   RegExp.prototype.toJSON = RegExp.prototype.toString;
>   console.log(JSON.stringify(reg));//"/\\d/g"
>   ```
>
> - **JSON.parse()**：将JSON字符串转换成对应的值。
>
>   ```js
>   JSON.parse('{}') // {}
>   JSON.parse('true') // true
>   JSON.parse('"foo"') // "foo"
>   JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
>   JSON.parse('null') // null
>   
>   var o = JSON.parse('{"name": "张三"}');
>   o.name // 张三
>   ```
>
>   如果不是JSON格式，则JSON.parse()方法报错。
>
>   ```js
>   JSON.parse("'sss'");//SyntaxError: Unexpected token ' in JSON at position 0
>   //单引号不符合JSON格式，报错
>   ```
>
>   为了处理解析错误，可以将JSON.parse()方法放在try-catch代码块中
>
>   ```js
>   try{
>       JSON.parse("'sss'");
>   }catch(e){
>       console.log('parsing error');
>   }
>   ```
>
>   **第二个参数**：可以接收一个处理函数。
>
>   ```js
>   function f(key value){
>       if(key === 'a'){
>           return value+10;
>       }
>       return value;
>   }
>   JSON.parse('{"a":1,"b":2}',f);//{ a: 11, b: 2 }
>   ```
>
>   

