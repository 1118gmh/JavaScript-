### 构造函数

> 基于构造函数创建自定义类
>
> 1. 在普通函数执行的基础上“new xxx()”，这样就不是普通函数执行了，而是构造函数执行，当前的函数名称之为“类名”，接收的返回结果是当前类的一个实例
> 2. 自己创建的类名，最好第一个单词首字母大写
> 3. 这种构造函数设计模式执行，主要用于组件、类库、插件、框架等的封装，平时编写业务逻辑一般不这样处理

```js
function Fn(){
    
}
Fn();//=>普通函数执行
var f = new Fn();//=>Fn是类 f是类的一个实例
console.log(f);
var f2 = new Fn();//=>f2也是Fn的一个实例，f2和f是相互独立的
```

> JS中创建值有两种方式
> 1. 字面量表达式
>
> 2. 构造函数模式

```js
var obj = {};//=>字面量方式
var obj = new Object();//=>构造函数模式
//=>不管是哪一种方式创造出来的都是Object类的实例，而实例之间是独立分开的，所以var xxx = {} 这种模式就是JS中的单例模式
```

> 基本数据类型基于两种不同的模式创建出来的值是不一样的
>
> - 基于字面量创建出来的值是基本类型值
> - 基于构造函数创建出来的值是引用类型
> - num2是数字类的实例，num1也是数字类的实例，它只是JS中表达数字的方式之一，都可以使用数字类提供的属性和方法

```js
var num1 = 12;
var num2 = new Number(12);
console.log(typeof num1);//=>"number"
console.log(typeof num2);//=>"object"
```

> Fn();  普通函数执行：
>
> 1. 形成一个私有的作用域
> 2. 形参赋值
> 3. 变量提升
> 4. 代码执行
> 5. 栈内存释放问题

> new Fn();   构造函数执行
>
> 1. 和普通函数执行一样，形成一个私有的作用域（栈内存）
>    - 形参赋值（私有变量）
>    - 变量提升（私有变量）
> 2. 【构造函数执行独有】在JS代码自上而下执行之前，首先当前形成的私有栈中创建一个对象（创建一个堆内存：展示不存储任何的东西），并且让函数中执行主体（this）指向这个新的堆内存（this===创建的对象）
> 3. 代码自上而下执行
> 4. 【构造函数执行独有】代码执行完成，把之前创建的堆内存地址返回（浏览器默认返回）

```js
function Fn(name,age){
    var n = 10;
    this.name = name;
    this.age = age + n;
}

var f1 = new Fn('xxx',20);
var f2 = new Fn('aaa',30);

console.log(f1 === f2);
console.log(f1.age);//=>30
console.log(f2.name);//=>'aaa'
console.log("name" in f1);//=>true name&age在两个实例中都有存储，但是都是每个实例的私有属性
console.log(f1.n);//=>undefined 只有this.xxx=xxx的彩盒实例有关系，n是私有作用域中的一个私有变量而已（this是当前类的实例）

/*
 *拓展：in：检测当前对象中中是否存在某个属性（不管当前这个属性是对象的私有属性，还是公有属性，只要有结果就是true）
 *	console.log('m' in f);//=>true
 *	console.log('n' in f);//=>false
 *	console.log('toString' in f);//=>true toString是它的公有属性
 */
```

![构造函数底层运行机制](D:\js学习\js高级\img\构造函数底层运行机制.png)

> 构造函数执行，不写return，浏览器会默认返回创建的实例，但是如果我们自己写了return？
>
> - return的是一个基本值，返回的结果依然是类的实例，没有受到影响
> - return的是一个引用类型值，则会把返回的实例覆盖，此时接收到的结果就不在是当前类的实例了
> 
> 因此构造函数在执行的时候，尽量减少return的使用，防止覆盖实例

> var f = new Fn();//=>new Fn;  
>
> 构造函数执行时，如果不需要传递实参，我们可以省略小括号，意思还是创建实例（和加小括号没有区别）

**new.target属性**

> 如果当前函数时new命令调用，new.target指向当前函数。不是则为undefined
>
> ```js
> //=>可以判断函数调用的时候是否使用了new命令
> function f(){
>     if(!new.target){
>         throw new Error('请使用new命令调用');
>     }
> }
> f();//Uncaught Error: 请使用new命令调用
> ```
>
> 

**模拟new的实现**

```js
function Animal(type){
    this.type = type;
}
Animal.prototype.say = function(){
    console.log('哈哈哈');
}
function mokNew(){
    //Constructor=>获取该方法的第一个参数（并且删除第一个参数），该方法是构造函数
    let Constructor = Array.prototype.shift.call(arguments);
    
    let obj = {};//返回的结果
    obj.__proto__ = Constructor.prototype;//原型上的方法
    
    let r = Constructor.apply(obj,arguments);
    return r instanceof Object ? r : obj;//如果返回值是一个对象，就返回该对象，否则返回一个构造函数的实例对象
}
let animal = mokNew(Animal,'dog');
console.log(animal.type);
animal.say();//=>dog 哈哈哈
```



