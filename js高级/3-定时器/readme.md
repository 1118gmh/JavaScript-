### js定时器

> 在“任务队列”中，除了放置异步任务的事件，“任务队列”还可以放置定时事件，即指定某些代码在多少时间之后执行。这就叫做定时器，也就是定时执行的代码。
>
> 定时器指定的时间间milliser隔指：**将定时事件添加到任务队列的milliser毫秒处执行，而不是milliser毫秒时执行。**
>
> 定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。

> window上的方法：
>
> - setInterval()：间隔定时器，按照指定的周期（以毫秒计）来调用函数或计算表达式。
> - setTimeout()：单次定时器，在指定的毫秒数后调用函数或计算表达式。
> - clearTimeout：清除单次定时器
> - clearInterval：清除间隔定时器

- setInterval()

  > 语法setInterval(code,milliser,lang)
  >
  > code：必须。要调用的函数或要执行的代码串。
  >
  > millisec：必须。周期性执行或调用code之间的时间间隔，以毫秒计。
  >
  > lang：可选。JScript|VBScript|JavaScript

- setTimeout()

  > 用于在指定的毫秒数后调用函数或计算表达式
  >
  > 语法：setTImeout(code,milliser,lang)
  >
  > code：必须。要调用的函数或要执行的代码串。
  >
  > millisec：必须。在执行代码前需要等待的毫秒数。
  >
  > lang：可选。JScript|VBScript|JavaScript

  ```js
  var oBtn = document.ElementById("btn1");
  oBtn.onclick = function(){
      testClick("2222");
  };
  function testClick(arg){
      setTimeout(function(){
          console.log("hello:"+arg);
      },2000);
  }
  //点击后过2秒输出 hello:2222
  ```

  > 注意：setTimeout()只执行function内的代码一次，如果多次调用，请使用setInterval()或者在function内再次调用setTimeout()。
  >
  > 

**举个例子**

> 基本用法

```js
//以下代码执行后输出什么？
var intervalId,timeoutId;

timeoutId = setTimeout(function(){
    console.log(1);
},100);

setTimeout(function(){
    clearTimeout(timeoutId);
    console.log(2);
},100);

setTimeout('console.log("5")',400);

intervalId = setInterval(function(){
    console.log(4);
    clearInterval(intervalId);
},200);
//
```

**setTimeout和setInterval区别**

```js
//1.
setTimeout(function(){
    console.log('timeout');
},1000);
setInterval(function(){
    console.log('interval');
},1000);
//setTimeout输出一次timeout
//setInterval每隔一秒输出一次interval

```

**重复定时器setInterval的高级应用模式：使用链式setTimeout()代替setInterval**

> 使用setInterval()创建的定时器确保了定时器代码规则地插入队列中。这种方式的问题在于：定时器代码的执行时间大于间隔时间，导致定时器代码连续执行，之间没有任何停顿。
>
> JavaScript引擎能够避免这个问题，但是会出现两个问题：
>
> - 某些间隔会被跳过；
> - 多个定时器的代码执行之间的间隔可能会比预期的要小；
>
> 因为定时器规则：**当且仅当任务队列中没有该定时器的任何其他代码实例时，才将定时器代码添加到队列中**
>
> 如果设置一个重复定时器（setInterval），处理的时间为300毫秒；但是间隔时间是200毫秒；间隔时间小于单次定时器内代码的处理时间；就会同时出现跳过间隔且连续运行定时器代码的情况。（**队列中已经有一次相同的定时器时，第二次添加会被忽略**）
>
> **解决:使用链式setTimeout()代替setInterval**
>
> ```js
> setTimeout( function() {  
>        /* 代码块... */   
>       setTimeout( arguments.callee, 400 );   
> }, 500 ); 
> //arguments.callee属性：引用该函数的函数体内当前正在执行的函数。
> //但是在严格模式下，该属性已废弃。
> ```
>
> 特点：
>
> - 在前一个定时器代码执行完之前，不会向队列中插入新的代码，确保不会有任何缺失的间隔。
> - 保证在下一次定时器代码执行之前，至少要等待指定的间隔，避免了连续的运行。
>
> 这种模式主要用于重复定时器
>
> 例：
>
> ```js
> var timer=setTimeout(function(){
>     //处理中
>     left = parseFloat(window.getComputedStyle(div,null).left)+5;
>     console.log(left);
>     div.style.left = left + "px";
>     if (left < 200) {
>         setTimeout(arguments.callee, 500);
>         console.log("star agin ");
>     }else{
>         console.log("clear Timeout");
>         clearTimeout(timer);
>     }
> }, 10);
> ```
>
