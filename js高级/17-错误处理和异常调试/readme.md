### js错误处理和异常调试

**查看报错**

> F12调出控制台

**错误的处理**

- **try catch**

  > 一旦发生错误，程序就终止执行了。但是js提供try-catch结构，允许对错误处理。
  >
  > ```js
  > try{
  >     throw new Error('出错');//中断程序，抛出错误
  > }catch(e){
  >     console.log(e.name+":"+e.message);
  >     console.log(e.stack);
  > }
  > //Error: 出错
  > //    at <anonymous>:2:11
  > ```
  >
  > try代码块抛出错误，此错误被catch代码块捕获了。catch接收一个参数，表示try代码块抛出的值。
  >
  > ```js
  > try{
  >     consolele.log();//中断程序，抛出错误
  > }catch(e){
  >     console.log(e.name+":"+e.message);
  >     console.log(e.stack);
  > }
  > //ReferenceError: consolele is not defined
  > //    at <anonymous>:2:5
  > ```
  >
  > 
  
  > **只有在不兼容的浏览器中发生了异常的错误，我们才可以用try catch捕获到，才能判断兼容**（基本上不兼容的执行的时候都会报错）；需要运行，然后才能判断，属于撞墙式处理；
  >
  > A行就A上，A不行就试试B
  >
  > ```js
  > function testError(){
  >  try{
  >      console.log("执行了try里面的代码");
  >      return "返回的是1";
  >  }catch(error){
  >      console.log("执行了catch里面的代码");
  >      return "返回的是2";
  >  }finally{
  >      console.log("无论是否报错finally里代码都执行");
  >      return "返回的是3";
  >  }
  > }
  > var a = testError();
  > console.log(a);
  > /*
  > 执行了try里面的代码
  > 无论是否报错finally里代码都执行
  > 返回的是3
  > */
  > ```
  >
  > 正常情况是return后，函数中只要读取到return就停止执行本函数；但是在这里是特殊；
  >
  > 因为函数还有一条规则是函数只能有一个返回值，当执行try的时候，遇到return，确实退出本次执行了，此时的返回值也是try内的返回值，但是因为finally的机制，必须还要再执行一次，finally里面的代码，此时return被改写成了finally里的返回值；【因为函数只能有一个返回值】；所以此时返回的是3！（catch的时候思路一样）
  >
  > **处理兼容性问题时，不用try catch，用判断对象中是否有这个属性的原理**
  >
  > 在明知道自己代码哪里会出差错，哪里不会出错；也就是最常见的处理兼容性问题的时候，用try catch语句就不合适了；
  >
  > 处理兼容性问题可以用下面的：
  >
  > ```js
  > //=>获取document下getElementByClassName的属性值，如果不兼容返回的值是undefined，如果兼容返回的是一个function，然后把返回值转换成布尔类型值来判断真假。
  > if(document.getElementsByClassName){}
  > //=>直接用in来判断是不是document的一个属性，是返回true，不是返回false；判断属性，直接返回布尔值，用in来判断性能最好！
  > if("getElementsByClassName" in document){}
  > //=>认为只有这样才是兼容的
  > if(typeof document.get ElementsByClassName==="function"){}
  > ```
  >
  > **错误的类型总结**
  >
  > 利用不同的类型，可以熟悉更多的异常信息，有助于快速对错误做出恰当的处理；
  >
  > - Error;
  >
  >   > 基类型，其他错误类型都继承自该类型；
  >   >
  >   > Error实例对象的三个属性
  >   >
  >   > - **message**：错误提示信息（必须）
  >   > - **name**：错误名称（非标准属性）
  >   > - **stack**：错误的堆栈（非标准属性）
  >
  > - Eval错误，EvalError;
  >
  >   > 会在使用eval()函数而发生异常是被抛出；
  >
  > - 范围错 RangeError;
  >
  >   > 数值超过相应范围是触发；
  >   >
  >   > `var a = new Array(-10);//Uncaught RangeError: Invalid array length`
  >
  > - 变量引用错误 ReferenceError;
  >
  >   > 找不到对象的时候，会报这个错误，（通常在访问不存在的变量时，就会发生这种错误；
  >   >
  >   > `var a = luanxie;//Uncaught ReferenceError: luanxie is not defined `
  >
  > - 语法错误 SyntaxError;
  >
  >   > 表示函数出现语法错误；（当我们把语法错误的js代码传入eval()函数中，就会发生此类错误）
  >   >
  >   > `eval("a++b");Uncaught SyntaxError: Invalid or unexpected token
  >
  > - 变量类型不符 TypeError;
  >
  >   > 当变量保存以外类型，或者访问不存在的方法时，都会导致这个错误；（抛出这个错误是由于在执行特定类型操作时，变量类型并不符合要求。）（一般存在于传递函数的参数实现未经过检查，结果传入类型与预期类型不相符）
  >   >
  >   > `var o  =new 10;//Uncaught TypeError: 10 is not a constructor`
  >   >
  >   > `Function.prototype.toString.call("string");//Uncaught TypeError:Function.prototype.toString is not generic`
  >
  > - URIError;
  >
  >   > 在使用encodeURI()/decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()、unescape()时，而URI不正确的时候，就会报这个错误。（这个错误很少见，因为这个错误的容错性非常高）
  >
  > **错误类型的处理**
  >
  > 可以在try-catch语句的catch语句中使用instanceof操作符；
  >
  > ```js
  > try{
  >     someFunction();
  > }catch(error){
  >     if(error instanceof TypeError){
  >         //处理类型错误
  >     }else if(error instanceof ReferenceError){
  >         //处理变量引用错误
  >     }else{
  >         //处理其他错误
  >     }
  > }
  > ```
  >
  > **try catch的合理用处**
  >
  > 使用与我们无法控制的错误，假设在使用一个大型js库中的函数，这个函数可能会有意无意的抛出一些错误；由于我们无法修改这个可的源代码，所以大可对改代码的调用放在一个try-catch语句中，万一有什么错误发生，可以恰当处理；
  >
  > 一般来说，应用程序架构的较低层次中经常会抛出错误，但这个层次并不会以你选哪个当前执行的代码；因而错误通常得不到真正的处理，打过打算编写一个要在很多引用程序中使用的js库，甚至只编写一个可能会在应用程序内部多个地方使用的辅助函数，建议在抛出错误时提供详尽的信息；然后，即可在引用程序中捕获并适当处理这些错误；
  >
  > **捕获与抛出错误：只应该捕获那些确切知道该如何处理的错误！捕获错误的目的在于避免浏览器以默认方式处理它们，而抛出错误的目的在于提供错误发生具体原因的消息。**
  
- 抛出错误

  > 中断程序，抛出一个错误
  >
  > **抛出错误的目的在于提供错误发生具体原因的消息；**
  >
  > 与try-catch相配的还有一个throw操作符；用于随时抛出自定义错误；抛出错误的时候必须要给throw操作符一个值，这个值是什么类型，没有要求；
  >
  > `throw 12345;//Uncaught 12345`
  >
  > **使用内置错误类型**
  >
  > 每种错误类型的构造函数接收参数，就是实际的错误消息；浏览器会以常规方式报告这个错误；
  >
  > 常用：Error通用类型、范围错误RangeError、变量引用错误ReferenceError、变量类型错误TypeError；
  >
  > ```js
  > throw new Error("抛出通用错误");//Uncaught Error: 抛出通用错误
  > throw new RangeError("抛出范围错误");//Uncaught RangeError: 抛出范围错误
  > ...
  > ```
  >
  > **抛出错误的时机**
  >
  > ```js
  > function test(ary){
  >     ary.sort();//如果执行这个函数时 ，给它传入一个字符串参数，那么对sort的调用就会失败；
  > }
  > //=>假如传入字符串，则默认报错，根据默认报错我们无法得知到底错哪了。
  > test("123");//Uncaught TypeError: ary.sort is not a function
  > 
  > //这种情况下，带有适当信息的自定义错误能够显著提升代码的可维护性；
  > function testName(ary){
  >     if(!(ary instanceof Array)){
  >         throw new Error("testName():arguments must array");//手动抛出错误介绍，调用这个函数的时候，如果错了，一下子就知道问题了。
  >     }
  > }
  > ```
  >
  > 做复杂的js基础库的时候，一定要考虑异常处理；**正确的错误处理机制应该可以确保代码中只发生你自己抛出的错误。**
  >
  > **错误事件**
  >
  > 任何通过try-catch处理的错误都会触发window对象的error实现；这个事件是web浏览器最支持的时间之一；IE、FF、chrome为了保证向后兼容，并没有对这个事件做任何修改，但是欧朋，safafi不支持error事件；
  >
  > 在任何浏览器中，onerror事件处理程序不会创建event对象；但它可接受三个参数：错误消息、错误所在URL和行号；
  >
  > - 错误消息给出了错误的具体信息（是最重要的）
  > - URL只给出为了文档位置
  > - 而行号所指的代码既可能出自嵌入的js代码；也可能来自外部的文件
  >
  > 要指定onerror事件处理程序；必须使用如下所示DOM0技术，他没有遵循“DOM2级事件”的标准格式
  >
  > ```js
  > window.onerror = function(message,url,line){
  >     alert(message);
  > };
  > //只要是浏览器生成的，都会触发error事件，并执行这个事件处理程序然后浏览器默认的机制发挥作用，像往常一样显示错误消息；
  > 
  > //像下面这样在事件处理程序中返回false，可以阻止浏览器报告错误的默认行为；
  > window.onerror = function(message,url,line){
  >     alert(message);
  >     return false;//通过返回false，这个函数实际上就充当了整个文档中的try-catch语句，可以捕获所有无代码处理的运行时错误；这个事件处理程序；是报告浏览器报告错误的最后一道防线；理想情况下，只要可能就不应该使用它，只要能够适当地使用try-catch语句就不会有错误交给浏览器，也就不会触发error事件。
  > }
  > ```
  >
  > 
  >
  > 

