### ES6基础语法

1. **let / const**

   > ES6中新增的用来创建变量和常量的

   ```js
   let a = 12;
   a = 13;
   console.log(a);//=>13
   
   const b = 12;
   b = 13; //=>VM103:2 Uncaught TypeError: Assignment to constant variable. 基于const创建变量，变量存储的值不能被修改（常量）
   console.log(b);
   ```

   > let和var的区别

   - let不存在变量提升（当前作用域中，不能再let声明前使用变量）

   - 同一个作用域中，let不允许重复声明

   - let解决了typeof的一个暂时性死区问题

     > 暂存死区：如果作用域内，有这样一个变量，那么这个作用域就会绑定这个变量，不会再继续向上查找
     >
     > ```js
     > let a = 1;
     > {
     >     let a = 2;
     >    console.log(a);//2
     > }
     > ```

   - 全局作用域中，使用let声明的变量并没有给window加上对应的属性

   - let会存在块作用域（除对象以外的大括号都可以被看作块级私有作用域）

     ```js
     for(let i = 0;i<3;i++){
         setTimeout(function(){
             console.log(i);
         },1000);
     }
     console.log(i);//=>Uncaught ReferenceError: i is not defined
     ```

     

2. **箭头函数及this问题**

   > ES6中新增了创建函数的方式：“箭头函数”
   >
   > 真实项目中是箭头函数和function这种普通函数混合使用

   > 箭头函数简化了创建函数的代码

   ```js
   //=>箭头函数的创建都是函数表达式方式（变量=函数），这种模式下，不存在变量提升，函数只能在创建完成后被执行（也就是创建的代码之后执行）
   const fn = ([形参])=>{
       //函数体 （return）
   };
   fn([实参]);
   
   //=>形参只有一个，小括号可以不加
   const fn = n=>{};
   //=>函数体中只有一句话，并且是return xxx的，可以省略大括号和return
   const fn = n=>n*10;
   ```

   > 箭头函数中没有arguments，但是可以基于剩余运算符获取实参集合，而且ES6中是支持给形参设置默认值的

   ```js
   let obj = {}；
   let fn = (context = window,...arg)=>{
       //...arg:剩余运算符（把除第一项外的，其他传递的实参信息都存储到args这个数组集合中）
       console.log(args);
   };
   fn(obj,10,20,30); //=>context:obj arg:[10,20,30]
   fn(); //=>context:window arg:[]
   ```

   > 箭头函数中没有自己的this，他里面用到的this是外层的this

   ```js
   window.name = "WINDOW";
   let obj = {
       name:'OBJ'
   };
   let fn = n => {
       console.log(this.name);
   };
   
   fn(10); //=>this:window
   fn.call(obj,10); //this:window 不是我们预期的OBJ
   document.body.onclick = fn; //=>this:window 不是我们预期的BODY
   
   
   let obj= {
       name:'OBJ',
       fn:function(){
           //this:obj 普通函数是有自己的this的
           let f = ()=>{
               console.log(this);
           }
           fn(); //=>this:obj
           return f;
       }
   };
   let f = obj.fn();
   f(); //=>{name: "OBJ", fn: ƒ}  this:obj
   ```

   > this总结:
   >
   > - 给元素的某个事件行为绑定方法，当事件触发，找到对应的方法，方法中的this是当前元素本身
   > - 普通函数执行，函数中的this取决于执行的主体，谁执行的，this就是谁（执行主体：方法 执行，看方法名前面是否有“点”，有的话，点前面是谁this就是谁，没有this则是window）
   > - 在构造函数中，this是当前一个类的一个实例
   > - 在自执行函数中this永远是window
   > - 可以通过call/apply/bind等强制改变this的指向
   > - 遇到箭头函数，以上作废，箭头函数中无this，它的所有this都是上下文中的this

   ```js
   //例子：
   let obj= {
       name:'OBJ',
       fn:function(){
           //this:obj
           //需求：1s后吧OBJ中name改为'珠峰'
          /*setTimeout(function(){
              console.log(this);//=>window
              this.name = '珠峰';//没有实现需求，这里是把window对象的name属性改为'珠峰'
          },1000);*/
           
           setTimeout(()=>{
              console.log(this);//=>obj
              this.name = '珠峰';
          },1000);
       }
   };
   obj.fn();
   console.log(obj.name); //=>珠峰
   ```

   

3. **ES6中的解构赋值**

   > 让左侧出现和右侧值相同的结构，以此快速获取到我们需要的内容
   >
   > 真实项目中常用在数组和对象中

   ```js
   //数组的解构赋值
   let ary = [10,20,30,40,50];
   /*
   let n = ary[0],
       m = ary[1],
       x = ary.alice(2);
   */
   
   /*
    *...x：把剩下的内容存储到x中（x是个数组），但是它只能出现在最后
    */
   let [n,m,...x] = ary;
   console.log(n,m,x);//=>10 20 (3) [30, 40, 50]
   
   let [n, ,m] = ary;
   console.log(n,m); //=>10 30
   
   let [n,,m,,,x=0] = ary;//=>如果没有这一项，我们可以基于等号赋默认值
   console.log(n,m,x);//=>10 30 0
   
   let ary = [10,20,[30,[40,50]]];
   let [n,,[,[,m]]] = ary;
   console.log(n,m); //=>10 50
   ```

   ```js
   //对象的解构赋值
   let obj = {
       name:'xiaoming',
       age:21,
       sex:'boy',
       friends:['zhangsan','lisi','wangwu']
   };
   //=>多维对象获取
   let {
       name，
       friends:[firstFriend]
   } = obj;
   console.log(name,firstFriend);
   
   
   //=>创建的变量要和对象的属性名一致，否则无法获取
   let {
       name,
       nianling,
       sex
       } = obj;
   console.log(name,sex,nianling); //=>xiaoming boy undefined 
   
   //=>冒号相当于给获取的结果设置了一个别名（变量名）：创建了一个叫做nianling的变量存储了obj.age的值
   let {
       age:nianling
   } = obj;
   console.log(nianling);//=>21
   
   //=>给获取的结果设置默认值（没有这个属性的时候走的是默认值）
   let {
       height = "180CM"
   } = obj;
   console.log(height);//=>180CM
   ```

   ```js
   let data = {
       code:0,
       data:{
           today:"2020",
           data:[]
       }
   };
   let {
       code,
       data:{
           today,
           data:cleardata
       }
   } = data;
   console.log(code,today,cleardata);//=>0 "2020" []
   ```

   

4. **"..."的作用**

  - 扩展运算符（多用在解构赋值中）
  - 展开运算符（多用在传递实参中）
  - 剩余运算符（多用在接收实参中）

  ```js
  //=>解构赋值
  let [n,...m] = [12,34,34];
  console.log(n,m); //=>12 [34, 34]
  
  //=>传递实参
  let ary = [12,23,34,45,56,67];
  let min = Math.min(...ary);
  //数组克隆(浅克隆)
  let cloneAry = [...ary];
  //对象克隆（浅克隆）
  let obj = {
      name:'小明',
      age:16
  };
  let cloneObj = {
      ...obj,
      sex:'boy',
      age:17
  }
  
  //=>接收实参
  let fn = (n,...arg)=>{
      //n:10
      //arg:[20,30]
  }
  fn(10,20.30);
  ```

  

5. **class创建类**

   ```js
   //=>传统ES3/ES5中创建类的方法
   function Fn(){
       this.x = 100;
   }
   Fn.prororype.getX = function(){
       console.log(this.x);
   };
   //构造函数执行
   var f1 = new Fn();
   f1.getX();
   //也可以把它当做普通函数执行
   Fn();
   //还可以把Fn当做普通对象设置键值对
   Fn.queryX = function(){};
   Fn.queryX();
   ```

   ```js
   //=>ES6中创建类
   class Fn{
       //等价于之前的构造函数
       constructor(){
           this.x = 100;
       }
       //直接写的方法就是加在原型上的 === Fnprototype.getX...
       getX (){
           console.log(this.x);
       }
       //给实例设置私有属性
       y = 200;
       //前面设置static的：把当前Fn当做普通对象设置的键值对
       static queryX(){}
       static y = 200;
   }
   //也可以在外面给原型上添加方法
   Fn.prototype.getY = function(){};
   Fn.z = 300;
   
   let f = new Fn(10,20);
   f.getX();
   Fn.queryX();
   
   Fn();//=>VM40:2 Uncaught TypeError: Class constructor Fn cannot be invoked without 'new'=>class创建的类不能当做普通函数执行
   ```

   **类的编译**

   > - 类的调用检测 _classCallCheck
   >
   >   当一个方法我们规定本应通过构造函数方式new出实例来，但是我们可能会粗心用普通函数执行时，不会显示错误，这时，我们应当添加一个累调用检测来抛出错误，提示我们自己应当用new
   >
   > - 属性描述器_createClass
   >
   >   三个参数：
   >
   >   - constructor：是构造函数
   >   - protoPropertys：是原型方法的描述
   >   - staticPropertys：是静态方法的描述

   ```js
   function _classCallCheck(instance,constructor){
       if(!(instance instanceof constructor)){
           throw new Error('Class constructor Child cannot be invoked without ...');
       }
   }
   let Parent = function(){
       function P(){
           _classCallCheck(this,P);
           _createClass(P,[],[]);
       }
       
       return P;
   }();
   Parent();//=>VM96:3 Uncaught Error: Class constructor Child cannot be invoked without
   let p = new Parent();
   ```

   ```js
   var _createClass = function () { 
       function defineProperties(target, props) { 
           for (var i = 0; i < props.length; i++) { 
               var descriptor = props[i]; 
               descriptor.enumerable = descriptor.enumerable || false;
               descriptor.configurable = true; 
               if ("value" in descriptor) descriptor.writable = true;
               Object.defineProperty(target, descriptor.key, descriptor); 
           } 
       } 
       return function (Constructor, protoProps, staticProps) { 
           if (protoProps) defineProperties(Constructor.prototype, protoProps); 
           if (staticProps) defineProperties(Constructor, staticProps); 
           return Constructor; 
       }; 
   }();
    
   function _classCallCheck(instance, Constructor) { 
       if (!(instance instanceof Constructor)) { 
           throw new TypeError("Cannot call a class as a function"); 
       } 
   }
    
   var Router = function () {
     function Router(router) {
       _classCallCheck(this, Router);
     }
    
     _createClass(Router, [{
       key: "b",
       value: function b() {}
     }], [{
       key: "a",
       value: function a() {}
     }, {
       key: "c",
       value: function c() {}
     }]);
    
     return Router;
   }();
    
   ```

   

6. **ES6中的模板字符串**

   ```js
   let year = '2019',
       mouth = '08',
       day = '09';
   let res = "你好，小伙伴！今天是"+year+"年"+mouth+"月"+day+"日，今天天气很糟糕，马上就要下大雨了，呵呵呵---";
   let ID= "box";
   let html = '<ul class = "list clear" id = "'+ID+'">';
   //=>我们真实项目中会大量进行字符串拼接操作（尤其是需要动态绑定数据：把现有的HTML代码拼接成数据的HTML字符串），传统的ES3语法模式下字符串拼接是一个非常苦逼的工作
   ```

   ```js
   let year = '2019',
       mouth = '08',
       day = '09';
   //=>反引号（搬） TAB键上面的 （ES6模板字符串语法）
   //${} 模板字符串中书写JS表达式的方式（凡是有输出结果的都可以被称为JS表达式，一般都是一行搞定的）
   let res = `你好，小伙伴！今天是${year}年${mouth}月${day}日，今天天气很糟糕，马上就要下大雨了，呵呵呵---`;
   ```

   > 传统方式拼接一套HTML字符串，还需要一行行的处理，非常麻烦，ES6中

7. Promise

   > Promise是一种异步编程的控制手段
   >
   > - 回调地狱，代码难以维护	第一个的输出是第二个的输入
   >
   >   解决：Promise链式调
   >
   > - promise可以支持多个并发的请求，获取并发请求中的数据
   >
   > - 这个promise可以解决异步的问题，本身不能说promise是异步的
   >
   > - promise（陈诺）关键字 
   >
   >   - resolve 成功
   >
   >   - reject 失败
   >
   >   - pending等待态
   >
   >   如果一旦promise成功了，就不能失败，相反也一样
   >   
   >   如果状态是等待的状态，才可以转换状态
   >   
   >   每一个promise的实例上都有一个then方法，then方法中有两个参数，一个参数叫成功的函数，另一个叫失败的函数
   >   
   >   promise中发生错误，就会 执行失败态
   
   ```js
   //Promise只有一个参数，叫excutor执行器（带resolve和reject两个参数的函数），默认new是就会调用
   let p = new Promise((resolve,reject)=>{
       //默认promise中的excutor是同步执行的
       resolve('买');
       reject('不买');
   });
   p.then((value)=>{
       console.log('value',value);
       
   },(err)=>{
          console.log('err',err);
          });
   // value 买
   ```
   
   ```js
   //一个promise的实例可以then多次
   p.then(value=>{
       console.log(value);
   });
   p.then(value=>{
       console.log(value);
   });
   p.then(value=>{
       console.log(value);
   });
   //=>买	买	买
   ```
   
   ```js
   //Promise.all方法调用或会返回一个新的promise
   Promise.all([read('1.txt'),read('2.txt')]).then([r1,r2]=>{
       console.log(r1,r2);
   },err=>{
       console.log(err);
   });
   //Promise.race方法处理多请求只取最快的
   Promise.race([read('1.txt'),read('2.txt')]).then([r1,r2]=>{
       console.log(r1,r2);
   },err=>{
       console.log(err);
   });
   //Promise.resolve()方法返回一个成功的promise
   //Promise.reject()方法返回一个失败的promise
   Promise.resolve('123').then(data=>{
       console.log(data);
   });//123
   Promise.reject('123').then(null,data=>{
       console.log(data);
   });//123
   ```
   
   

