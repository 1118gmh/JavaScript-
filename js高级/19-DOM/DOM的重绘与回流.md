### DOM的重绘与回流

> 1. 计算DOM结构
> 2. 加载CSS
> 3. 生成渲染树
> 4. 浏览器基于显卡按照渲染树画页面

- 重绘

> 当某一个DOM元素样式更改（位置没有变，只是样式更改），浏览器就会重新渲染这个元素

```js
box.style.color = 'red';//触发了一次重绘
box.style.fontSize = '16px';//又触发了一次重绘
...
//优化方案：
//=>一次性将需要修改的样式搞定，例：
//先写个样式类
.xxx{
    color = 'red',
    fontSize = '16px'
}
utils.addClassName(box,'xxx');
```

- 回流

> 当DOM元素的结构或者位置发生改变（删除、增加、改变位置、改变大小...）都会引发回流。
>
> 所谓回流，就是浏览器抛弃原有计算的结构和样式，重新生成DOM渲染树或者计算DOM结构，非常消耗性能

```js
//这个例子会引发多次（data.length次）回流，消耗性能
data.forEach((item,index)=>{
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a href="#"...>`;
    document.querySelector('.productBox').appendChild(curLi);
});
```

*优化方案1*


```js
//=>基于文档碎片（虚拟内存中开辟一个容器）可以解决这个问题；
//每创建一个Li，我们首先把它放到文档碎片中（不放到页面中，避免回流），当我们把需要的元素都创建完成，并且都添加到文档碎片中欧冠，在统一把文档碎片放到页面中（这样只会引发一次回流操作）
let frg = document.createDocumentFragment();//创建文档碎片容器
data.forEach((item,index)=>{
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a href="#"...>`;
    frg.appendChild(curLi);//每一次都把创建的Li添加到文档碎片中
});
document.querySelector('.productBox').appendChild(frg);//把文档碎片中的内容统一添加到页面中
frg = null;
```

*优化方案2*

```js
//基于ES6模板字符串拼接（或者普通字符串拼接）
let str= ``;
data.forEach((item,index)=>{
    let curLi = document.createElement('li');
    curLi.innerHTML = `<a href="#"...>`;
    str += curLi;
});
document.querySelector('.productBox').innerHTML = str;
```

