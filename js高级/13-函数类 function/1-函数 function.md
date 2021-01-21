### 函数 function

> 函数也是对象，函数名是指针

> 函数就是一个方法或者一个功能体，函数就是把某个功能的代码放到一起进行封装。若想操作这个功能，只需执行这个函数。=>"封装"：减少页面冗余代码，提高代码重复使用率（低耦合高内聚）
>
> 洗衣机例子：。。。
>
> - 创建函数
>   + 形参：创建函数的时候我们设置了形参变量，但如果执行的时候并没有给传递对应的实参值，那么形参变量默认值是：undefined （应当做形参默认处理）
>   + 返回值return：1、return的一定是值，需要在函数外接收值。2、当没有写return时，默认返回undefined。3、函数体中遇到return;，后面的代码则不再执行了（类似于循环体中的break、continue）
> - 执行函数
>   + 实参
> - argument
> - 函数底层运行机制
> - ...

**创建函数的三种方式和执行函数**

- function语法定义方法：

  ```js
  function test1(arg1,arg2){
      //函数体
      return;
  }
  test1();
  ```

- 函数直接量的定义方式

  ```js
  var test2 = function(arg1,arg2){
      //函数体
      return;
  }
  test2();
  ```

- 构造函数创建方式

  ```js
  var test3 = new Function("arg1","arg2","函数体");不推荐
  ```

**函数声明和函数的表达式声明**

> 函数声明方式定义function test(){}：在预解释的时候，变量绑定指针。
>
> 函数表达式声明var test = function(){}：在代码执行到此处的时候绑定指正。
>
> 除了什么时候可以通过变量访问函数这一点之外，函数声明和函数表达式声明是等价的。

```js
//例：求两个数的和，算完之后*10，然后除以2；
function sum(n,m){
	//形参默认值处理：如果没有传递形参，，给予一个默认值
	if(n === undefined){
		n = 0;
	}
	if(typeof m === 'undefined'){
		m = 0;
	}
	
	let result = n + m;
	result *= 10;
	result /= 2;
	console.log(result);
}

sum();
sum(10);
sum(10,20);
```

**js中的函数没有重载的概念**

> 重载：方法名相同，形参列表相同，方法体不同。
>
> 但是js中不存在这种机制，因为函数名就是一个变量，函数名相同的话，

**匿名函数**

> - 匿名函数之函数表达式：把一个匿名函数本身作为值赋值给其他东西，这种函数一般不是手动执行，而是靠其他程序驱动触发执行（例如触发某个事件的时候让它执行等）
>
> `document.body.onclick = function (){}`
>
> `setTimeout(function(){},1000);`//=>设置定时器，1000ms后执行函数
>
> - 匿名函数之自执行函数：创建完一个匿名函数，紧接着就把当前函数加小括号执行
>
> `(function(n){})(100);`
>
> 匿名函数中的this指向window

```js
需求：任意数求和：传递参数的个数不定，传递的值是否为有效数字不定，把传递的有效数字相加求和
function sum(){
	let total = null;
	for(let i = 0;i <arguments.length;i++){
		(!isNaN(arguments[i]))?(total +=Number(arguments[i])):null;
	}
	return total;
}
sum(10,20); //=>30
sum(10,'AA'); //=>10
```

**函数底层运行机制**

![函数底层运行机制](D:\js学习\js基础\img\函数底层运行机制.png)

> - 创建函数，开辟的堆内存中存储的是函数体中的代码，但是是按照字符串存储的。
> - 执行函数，先把fn函数代码执行，再把执行后的返回结果和AA关联再一起（函数的返回值只看return，有return，后面是啥返回值就是啥，没有就是undefined）
> - 每一次函数执行的目的都是把函数体中的代码（先从字符串变为代码）执行=>形成一个全新的私有栈内存（因此需要释放内存空间）

例子：实现按1输出1，按2输出2...

```js
<button value="按钮1">按钮1</button>
<button value="按钮2">按钮2</button>
<button value="按钮3">按钮3</button>
<button value="按钮4">按钮4</button>
<button value="按钮5">按钮5</button>
<script>
	var btnList = document.getElementsByTagName('button');	
	for(var i = 0;i<btnList.length;i++){
		//自定义属性
		btnList[i].myIndex = i;
		btnList[i].onclick = function(){
			//alert(i);
			alert(btnList[i].myIndex);
		}
	}
</script>
```

> 出错：每次都输出5
>
> 为什么：在执行完循环后，i已经变为5了，在点击按钮时执行点击事件函数，创建了新的私有栈内存，执行alert(i)，函数中没有i变量，获取外部的i变量，值为5。
>
> 如何解决：
>
> - 自定义属性：在每一个按钮对象内添加自定义属性用来存储索引，以供后面点击按钮时获取对应的索引使用。
> - 闭包解决方案
> - var改成let

运行过程：

![进一步理解函数和自定义属性](D:\js学习\js基础\img\进一步理解函数.png)

![进一步理解函数和自定义属性](D:\js学习\js基础\img\进一步理解函数02.png)

**初识arrow function箭头函数**

> 简单

```js
function sum(n,m){
	return n + m;
}
sum(10,20);
//改写成箭头函数
let sum = (n,m) =>{
	return n + m;
}
//如果{}内只有return一行，则可以去掉{}和return

let sum = (n,m) => n+m;
function fn(n) {
	return function (m){
		return n+m;
	}
}
//如果只有一个形参，则()可以去掉
let fn = n => m => n+m;
```

> 形参赋值默认值，当没有给形参传递实参的时候，执行默认值

```js
function sum(n,m){
	if(typeof n ==='undefined'){
		n = 0;
	}
	if(typeof m ==='undefined'){
		m = 0;
	}
	return n + m;
}
//箭头函数
let sum = (n = 0,m = 0) => n + m;
```

> 箭头函数中没有arguments，但是我们可以使用剩余运算符获取传递的实参集合（它是数组）

```js
let sum = (...arg) => {
	console.log(arg);
}
sum(1,2,3,4); //=>[1, 2, 3, 4]
```

**函数中的属性和方法**

*属性*

- **length**：保存了形参个数
- **prototype**：原型

*内部属性*

- **arguments**：函数内置的实参集合（类数组对象）

  > - 类数组集合，集合中存储着所有函数执行时，传递的实参信息
  > - 不论是否设置形参，argument都存在
  > - 不论是否传递实参，arguments也都存在

- **arguments.callee**：arguments的一个属性，表示当前函数本身

  > ```js
  > //阶乘函数
  > function factorail(num){
  >     if(num <= 1){
  >         return 1;
  >     }else{
  >         return num*factorail(num-1);
  >     }
  > }
  > 
  > //这样定义没得问题，但是这个函数的执行与函数名factorial紧紧的耦合在一起。为了消除这种紧密的耦合现象，就要使用arguments.callee属性
  > function factorial(num) {
  >     if (num <= 1) {
  >         return 1;
  >     } else {
  >         return num * arguments.callee(num - 1);
  >     }
  > }
  > var trueFactorial = factorial;
  > factorial = function() {
  >     return 0;
  > };
  > console.log(trueFactorial(5));
  > console.log(factorial(5));
  > ```

- **arguments.callee.caller**：这个属性中保存着调用当前函数的引用，如果是在全局作用下调用当前函数，它的值为null

  ```js
  function outer(){
      inner();
  }
  function inner(){
      console.log(inner.caller);
  }
  outer();
  //实现去耦合，通过arguments.callee.caller来访问
  function outer(){
      inner();
  }
  function inner(){
      console.log(inner.caller);
      console.log(arguments.callee.caller);
  }
  outer();
  ```

  > 严格模式下，arguments.callee和argument.callee.caller会报错。

*方法*

- Function.prototype.call

  > call()：使用一个指定的this值和单独给出一个或多个参数来调用一个函数
  >
  > call的特点：
  >
  > 1、可以改变当前函数的this指向，使得this绑定第一个参数
  >
  > 2、还会让当前函数执行

  > 模拟call方法原理

  ```js
  function fn1(){
      console.log(this);
  }
  function fn2(){
      console.log(2);
  }
  Function.prototype.call = function(context){
      context = context?Object(context) : window;
      context.fn = this;
      let args = [];
      for(let i = 1;i < arguments.length;i++){
          args.push('arguments['+i+']');
      }
      let r = eval(`context.fn(`+args+`)`);;
      delete context.fn;
      return r;
  }
  fn1.call('hello','1','2');//fn1的this指向hello这个对象
  fn1.call(fn2);//=>fn1的this指向fn2
  fn1.call.call.call(fn2);//2 多个call会让call方法之词能够 并且把call中的this改编成fn2
  ```

  > 使用call方法调用父构造函数

  ```js
  function Parent(name,age){
      this.name = name;
      this.age = age;
  }
  function Childern(name,age){
      Parent.call(this,name,age);
      this.father = 'haha';
  }
  let c1 = new Childern('jack',30);
  console.log(c1);//=>Childern {name: "jack", age: 30, father: "haha"}
  ```

  > 使用call方法调用匿名函数

  ```js
  let ary = [
      {name:'xiaohui',age:12},
      {name:'xiaoming',age:13}
  ];
  for(let i = 0;i < ary.length;i++){
      (function(i){
          this.print = function(){
              console.log(this.name+'|'+this.age);
          }
          this.print();
      }).call(ary[i],i);
  }
  //xiaohui|12
  // xiaoming|13
  //使用call方法调用匿名函数，让匿名函数的this指向ary[i]对象并且执行函数
  ```

  > 使用call方法调用函数并且制定上下文的this

  ```js
  function greet(){
      var reply = [this.animal,'typically sleep between', this.sleepDuration].join(' ');
      console.log(reply);
  }
  let obj = {
      animal:'cats',
      sleepDuration:'12 and 16 hours'
  };
  greet.call(obj);//=>cats typically sleep between 12 and 16 hours
  ```

  > 使用call方法调用函数并且不指定第一个参数(argument)

  ```js
  var sDate = 'Wisen';
  function display(){
      console.log('sDate value is %s',this.sDate);
  }
  display.call();//=>sDate value is Wisen
  ```

- Function.prototype.apply

  > apply与call类似，不同在于call接受的是参数列表，而apply接受的是一个参数数组

  > 底层原理

  ```js
  function fn1(){
      console.log(this);
  }
  function fn2(){
      console.log(2);
  }
  Function.prototype.apply = function(context,args){
      context = context?Object(context) : window;
      context.fn = this;
      if(!args){
          return context.fn();
      }
      let r = eval('context.fn('+args+')');
      delete context.fn;
      return r;
  }
  fn1.apply(fn2,[1,2,3,4]);
  ```

  > 将数组各项添加到另一个数组

  ```js
  var array = [1,2,3];
  var array2 = [4,5];
  /*concat实现的是拼接返回的是新数组
  不再需要循环
  for(let i = 0;i<array2.length;i++){
      array.push(array2[i]);
  }*/
  array.push.apply(array,array2);
  console.log(array);//=>[1, 2, 3, 4, 5]
  ```

  > 使用apply和内置函数

  ```js
  //需求：找出数组中的最大最小数字
  var numbers = [3,5,8,2,4];
  //使用Math.min/Math.max以及apply函数
  var max = Math.max.apply(null,numbers);
  var min = Math.min.apply(null,numbers);
  console.log(max,min);//=>8 2
  
  //注意：当数组中存在的参数太多时，可能会超出js引擎参数长度上限的风险，上限：65536；可以通过拆分数组解决
  /*
   *minOfArray:获取数组中的最小值
   *@params [Array]
   *@return min最小值
   */
  function minOfArray(arr){
      let min = Infinity;
      let sx = 32768;
      for(let i = 0;i <arr.length;i +=sx){
          let ary = arr.slice(i,Math.min(i+sx,arr.length));
          let submin = Math.min.apply(null,ary);
          min = Math.min(submin,min);
      }
      return min;
  }
  console.log(minOfArray(numbers));//2
  ```

  > 使用apply来链接构造器

  ```js
  //用Object.create(prototype)方法：创建一个新对象，并且让其__proto__指向现有对象
  Function.prototype.constructor = function(aArgs){
      var oNew = Object.create(this.prototype);
      this.apply(oNew,aArgs);
      return oNew;
  };
  ```

- Function.prototype.bind

  > 创建一个新函数返回并且使该新函数的this指向第一个参数，其余参数作为新函数的参数使用。绑定函数也可以使用new运算符构造，它会表现为目标函数已经被构建完毕了似的。提供的this值会被忽略，但前置参数仍会提供给模拟函数。
  >
  > 特点：
  >
  > - bind方法可以绑定this指向第一个参数，其余参数作为新函数的参数
  > - bind方法可以返回一个新的函数（高阶函数） 
  > - 如果绑定的函数被new了，当前函数的this就是当前的实例 
  > - new出来的结果可以找到原有类的原型

  

  ```js
  function fn(){
      this.age = 3;
      console.log(this.age);
  }
  let obj = {
      name:'xiaoming'
  };
  //创建绑定函数:创建一个新函数，把this绑定到obj对象
  let bindFn= fn.bind(obj);
  bindFn();
  new bindFn();//=>{age: 3}
  ```

  > 原理实现

  ```js
  let obj = {
      name:'xiaoming'
  };
  function fn(name,age){
      this.say = '说话';
    console.log(this);
      console.log(this.name+'养了一只'+name+age+'岁了');
  }
  Function.prototype.bind = function(context){
      let that = this;
      let bindArgs = Array.prototype.slice.call(arguments,1);
      function Fn(){} //Object.create原理
      function fBound(){
          let args = Array.prototype.slice.call(arguments);
          return that.apply(this instanceof fBound?this:context,bindArgs.concat(args));
      }
      Fn.prototype = this.prototype;
      fBound.prototype = new Fn();
      return fBound
  };
  
  let bindFn = fn.bind(obj,'猫');
  bindFn(10);//=>xiaoming养了一只猫10岁了
  console.log(new bindFn(9));//fBound {say: "说话"}
  ```

  用法：

  > 1. 偏函数：使一个函数拥有预设的初始参数

  ```js
  function list(){
      return Array.prototype.slice.call(arguments);
  }
  function addArguments(arg1,arg2){
      return arg1 + arg2;
  }
  var list1 = list(1,2,3);//=>[1,2,3]
  var result1 = addArguments(1,2);//=>3
  
  //创建一个函数，它拥有预设参数列表
  var leadingThirtysevenList = list.bind(null,37);
  //创建一个函数，它拥有预设的第一个参数
  var addThirtySeven = addArguments.bind(null,37);
  
  var list2 = leadingThirtysevenList();//=>[37]
  var list3 = leadingThirtysevenList(1,2,3);//=>[37, 1, 2, 3]
  var result2 = addThirtySeven(5);//=>37+5 = 42
  var result3 = addThirtySeven(5,10);//=>37+5 = 42 第二个会被忽略
  ```

  > 2. 配合setTImeout：（通过bind改变this指向）
  >
  >    使用window.setTimeout时，this关键字会指向window对象。当类中方法需要this指向实例时，则需要显式地把this绑定到回调函数，就不会丢失该实例的引用

  ```js
  function LateBloomer(){
      this.petalCount = Math.ceil(Math.random()*12)+1;
  }
  //在1秒钟后声明bloom
  LateBloomer.prototype.bloom = function(){
      var that = this;
      window.setTimeout(this.declare.bind(that),1000);
  };
  LateBloomer.prototype.declare = function(){
      console.log('I am a beautiful flower with '+this.petalCount+' petals');
  }
  var flower = new LateBloomer();
  flower.bloom(); //I am a beautiful flower with 6 petals 
  //1秒钟后调用declare方法
  ```

  > 3. 快捷调用：
  >
  >    例：将一个类数组转换成一个数组

  ```js
  function list(){
      return Array.prototype.slice.apply(arguments);
  }
  var list1 = list(1,2,3);//=>[1,2,3]
  ```


**函数的作用域**

> js中的作用域：
>
> - let 全局 函数 eval都可以产生作用域
>
> - 作用域是静态的，定义时产生
> - 执行函数时，会产生执行上下文（EC）
>   - 上下文分为：全局上下文、函数上下文
>   - 上下文三个特点：
>     - 变量对象（Variable object VO）：变量提升
>     - 作用域链：通过作用域链可以进行逐层查找上一级作用域
>     - this

> Fn();  普通函数执行：
>
> 1. 形成一个私有的作用域
> 2. 形参赋值
> 3. 变量提升
> 4. 代码执行
> 5. 栈内存释放问题

> 在函数内定义的变量不能再函数之外的任何地方访问，因为变量仅仅在函数的域的内部有定义。
>
> 相对应的，一个函数可以访问定义在其范围内的任何变量和函数。
>
> 也就是说，定义在全局作用域中的函数，可以访问所有全局作用域下的变量。定义在函数中的函数，可以访问父函数有权访问的任何其他变量。

``` js
//下面变量定义在全局作用域（global scope）中
var num1 = 20,
    num2 = 3,
    name = "Chamahk";
//本函数定义在全局作用域中
function multiply(){
    
    return num1 * num2;
}
multiply();//=>60
function getScore(){
    var num1 = 2,
        num2 = 3;
    function add(){
        return name + " scored " +(num1+num2);
    }
    return add();
}
getScore();//=>"Chamahk scored 5"
```