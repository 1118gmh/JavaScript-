### js测试和性能分析小方法

**测试**

> 测试可以保证我们程序的稳健性，可以通过consol.asssert来实现；

```js
var a = 1;
var b = 2;
console.log(a===1,"a不等于1");
console.log(b===1,"b不等于1");//这一行被输出
```

**性能分析**

> 通过执行时间来进行新能分析

```js
//性能优化
console.time("timer");
for(var i = 0;i < 10000;i++){}
console.timeEnd("timer");
```

