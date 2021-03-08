### JS的严格模式

#### JS的严格模式

> 在当前作用域的第一行添加“use strict”即可，这样就在当前作用域中开启了JS的严格模式
>
> 在一个JS文件中开启严格模式，不会影响到另一个JS文件，真实项目中，一般会把所有JS文件合并压缩为一个导入到页面中
>
> 自己在开发时，要习惯使用严格模式，用闭包将自己做的模块包起来，这样不会影响到他人的代码
>
> ```js
> ~function(){
>     "use strict";
>     //...
> }();
> ```

#### 严格模式VS非严格模式

```js
//=>1. 在严格模式下不能使用arguments.callee / arguments.callee.caller
//=>2. 在严格模式下不允许给一个对象设置重复属性名的
//=>3. 在严格模式下，函数执行，如果没有明确的执行的主体（函数前面没有点），this指向undefined，代表没有执行主体
//=>...

~function(){
	function fn(){
        console.log(this);//window
    }
    fn();
}();
~function(){
    "use strict";
	function fn(){
        console.log(this);//undefined
    }
    fn();
}();
```

