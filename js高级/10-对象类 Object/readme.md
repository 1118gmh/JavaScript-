### object对象数据类型-普通对象

> 对象的创建：
>
> - 构造函数模式：
>
>   ```js
>   var person = new Object();
>   person.name = "xiaoming";
>   person.age = "35";
>   ```
>
> - 字面量方式：以key:value方式定义，中间用","来隔开。
>
>   ```js
>   var person = {
>       name:"xiaoming",
>       age:"35"
>   };
>   ```
>
>   **对象的字面量创建方式是首选：语法代码少，给人封装数据的感觉。**

> 获取属性名对应的属性值
>
> - 对象.属性名
>
> - 对象[属性名]   注意:属性名是数字或者字符
>
>   注意：
>
>   - 如果属性名不存在，则默认属性值是undefined
>   - 如果属性名是数字，则不能使用对象.属性名的方式来获取对应属性值
>
> **使用方括号的有点在于可以通过变量来访问属性**

```js
var propertyName = "name";
console.log(person2[propertyName]); //"broszhu"
//真删除
delect person[1];
//假删除
person.weight = null;
console.log(person.weight);//=>null
```

> 删除
>
> - 真删除：把属性彻底干掉
> - 假删除：属性还在，值为空

**Object中常用的静态方法**

- Object.create()：创建一个对象，一个参数，表示原型对象，使用该原型对象来提供创建的对象的\_\_proto\_\_

  ```js
  var person = {
      print:function(){
          console.log(`我的名字${this.name},我的年龄${this.age}`);
      }
  };
  var obj = Object.create(person);
  obj.name = 'xiaoming';
  obj.age = '35';
  console.log(obj.print());//我的名字xiaoming,我的年龄35
  ```

  ```js
  //使用Object.create实现寄生组合继承
  function father(x){
      this.x = x;
  }
  father.prototype.getX = function(){
      console.log(this.x);
  };
  function childern(y){
      father.call(this,200); //通过call继承父亲中私有的属性和方法
      this.y = y;
  }
  childern.prototype = Object.create(father.prototype);//通过Object.create继承父亲中公有的属性和方法。
  childern.prototype.constructor = childern;
  //儿子中的方法一定要等到儿子继承完父亲之后再写。（因为儿子的原型变为了新创建的对象，该方法是写在原型中的）
  childern.prototype.getY = function(){
      console.log(this.y);
      console.log(this.x);
  };
  var obj = new childern(100);
  obj.getY();
  ```

- Object.getPrototypeOf()：获取对象的原型对象

- Object.defineProperty()：定义对象的单个属性的特性

- Object.defineProperties()：定义对象的多个属性的特性

- Object.getPropertyDescriptor()：获取对象的属性的特性，返回的是数组，存储了这些特性

- Object.preventExtensions()：禁止扩展
- Object.isExtensible()：判断对象是否可扩展
- Object.seal()：密封对象
- Object.isSealed()：判断对象是否是密封的
- Object.freeze()：冻结对象
- Object.isFrozen()：判断对象是否是冻结的



**Object中常用的实例方法：**

- toString

  > 返回一个对象的字符形式，默认返回字符串

  ```js
  var o1 = new Object();
  o1.toString();//"[object Object]"
  var o2 = {};
  o2.toString();//"[object object]"
  ```

  > 通过自定义toString方法，可以的到想要的字符串
  >
  > 数组、字符串、函数、Date对象分别部署了自定义方法，覆盖了Object.prototype.toString()方法

  ```js
  [1,2,3].toString() //"1,2,3"
  '123'.toString() //"123"
  (function(){
      return 123;
  }).toString(); 
  /*
  "function(){
  return 123;
  }"
  */
  (new Date()).toString()//"Wed Nov 04 2020 17:26:31 GMT+0800 (中国标准时间)"
  ```

  **toString方法的应用：判断数据类型**

  > `Object.prototype.toString`方法返回对象的类型字符串，因此可以用来判断一个值的类型

  ```js
  var obj = {};
  obj.toString();//"[object Object]"
  //调用toString方法，返回"object Object"字符串，
  //第二个Object表示该值的构造函数，可以用来判断数据类型
  ```

  > `Object.prototype.toString.call(value)`
  >
  > value值调用Object.prototype.toString方法，可以返回不同类型字符串：
  >
  > 数值：返回[object Number]
  >
  > 字符串：返回[object String]
  >
  > 布尔值：返回[object Boolean]
  >
  > undefined：返回[object Undefined]
  >
  > null：返回[object Null]
  >
  > 数组：返回[object Array]
  >
  > arguments对象：返回[object Arguments]
  >
  > 函数：返回[object Function]
  >
  > Error对象：返回[object Error]
  >
  > Date对象：返回[object Date]
  >
  > RegExp对象：返回[object RegExp]
  >
  > 其他对象：返回[object Object]

  ```js
  Object.prototype.toString.call(2);//"[object Number]"
  Object.prototype.toString.call('');//"[object String]"
  Object.prototype.toString.call(true);//"[object Boolean]"
  Object.prototype.toString.call(null);//"[object Null]"
  Object.prototype.toString.call(undefined);//"[object Undefined]"
  Object.prototype.toString.call(Math);//"[object Math]"
  Object.prototype.toString.call(/\d+/g);//"[object RegExp]"
  Object.prototype.toString.call([]);//"[object Array]"
  Object.prototype.toString.call({});//"[object Object]"
  ```

- hasOwnProperty

  > `Object.prototype.hasOwnProperty`返回一个布尔值，表示该实例对象自身是否具有该属性

  ```js
  var obj = {
      p:123
  };
  obj.hasOwnProperty('p');//true
  obj.hasOwnProperty('toString');//false 
  ```

- in

  > 检测某个属性是否是这个对象的属性（私有或公有都返回true）
  >
  > 单独使用或用在for-in中

  **同时使用hasOwnProperty和in就可以确定某个属性是否是对象原型上的属性**

  ```js
  /*
   *hasPrototypeProperty:判断obj对象的原型上是否有name属性
   *	@params 
   *	@return [boolean] 
   */
  function hasPrototypeProperty(object,name){
      return !object.hasOwnProperty(name) && (name in object);
  }
  ```

  

- propertyIsEnumerable

  > 对象的某个属性是否是可以枚举的





