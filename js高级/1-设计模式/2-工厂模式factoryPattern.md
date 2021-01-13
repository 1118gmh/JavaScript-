### 工厂模式(不提倡)

> 工厂模式（Factory Pattern）
>
> **优点**
>
> 1. 把实现相同功能的代码进行封装，以此来实现“批量生产”（后期想要实现这个功能，我们只需要执行函数即可）
> 2. “低耦合高内聚”：减少页面中的冗余代码，提高代码的重复使用率
>
> **缺点**
>
> 工厂模式虽然解决了重复 创建相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型），也就是某个对象属于什么类

```js
function createPerson(name,age){
    var obj ={};
    obj.name = name;
    obj.age = age;
    return obj;
}
var p1 = createPerson('xxx',25);
var p2 = createPerson('xxx',25);
```

