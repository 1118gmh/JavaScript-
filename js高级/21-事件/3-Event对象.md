### Event对象

#### 1、概述

> 事件发生以后，会产生一个事件对象，作为参数传递给监听函数。
>
> 浏览器提供一个Event对象，所有事件都是这个对象的实例，或者说继承了Event.prototype对象。

> Event对象本省就是一个构造函数，可以用来生成新的实例

```js
event = new Event(type,options);
```

- type：表示事件的名称
- options：是一个对象，表示事件对象的配置。有两个属性
  - bubbles：布尔值，表示是否冒泡，默认false，只能在捕获阶段触发监听函数。
  - cancelable：布尔值，默认false，表示事件是否可以被Event.preventDefault()取消。

```js
var ev = new Event('look',{
    'bubbles':true,
    'cancelable':false
});
document.dispatchEvent(ev);
//创建了一个look事件实例，然后使用dispatchEvent方法触发了事件
```

#### 2、实例属性

- Event.bubbles / Event.eventPhase

  > **Event.bubbles**返回一个布尔值，表示当前时间是否冒泡。只读。
  >
  > **Event.eventPhase**返回一个整数常量，表示事件目前所处的阶段。只读。
  >
  > - 0，表示事件没有发生
  > - 1，表示事件处于捕获阶段
  > - 2，表示事件到达节点
  > - 3，表示事件处于冒泡阶段

- Event.cancelable / Event.cancelBubble / Event.defaultPrevented

  > **Event.cancelable**返回一个布尔值，表示事件是否可以取消。只读
  >
  > 与Event.preventDefaule()方法结合使用，先判断是否可取消，防止浏览器的默认处理。
  >
  > **Event.cancelBubble**是一个布尔值，若设为true，则相当于执行Event.stopPropagation()方法，阻止事件的传播
  >
  > **Event.defaultPrevented**返回一个布尔值，表示事件是否调用过Event.preventDefault()方法，只读

- Event.currentTarget / Event.target

  > **Event.currentTarget**表示事件当前正在通过的节点。
  >
  > **Event.target**表示事件的原始触发节点。

- Event.type

  > 返回一个字符串，表示事件类型，事件类型是生成事件的时候指定的。只读。

- Event.timeStamp

  > 返回一个毫秒时间，表示事件发生的时间。相对于网页加载成功开始计算的。
  >
  > ```js
  > //鼠标每秒移动像素数量。
  > var previousX;
  > var previousY;
  > var previousT;
  > 
  > window.addEventListener('mousemove', function(event) {
  >   if (
  >     previousX !== undefined &&
  >     previousY !== undefined &&
  >     previousT !== undefined
  >   ) {
  >     var deltaX = event.screenX - previousX;
  >     var deltaY = event.screenY - previousY;
  >     var deltaD = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  > 
  >     var deltaT = event.timeStamp - previousT;
  >     console.log(deltaD / deltaT * 1000);
  >   }
  > 
  >   previousX = event.screenX;
  >   previousY = event.screenY;
  >   previousT = event.timeStamp;
  > });
  > ```

- Event.isTrusted

  > 返回一个布尔值，表示该事件是否有真实的用户行为产生。
  >
  > 用户点击产生click事件，该事件是用户产生的。
  >
  > Event构造函数生成的时间，则是脚本产生的。

- Event.detail

  > 该属性只有浏览器的UI事件才有。
  >
  > 返回一个数值，表示事件的某种信息。

#### 3、实例方法

- Event.preventDefault()

  > **Event.preventDefault()**
  >
  > 用于取消浏览器对当前事件的默认行为。但不会阻止事件的传播。
  >
  > 前提cancelable属性为true。
  >
  > ```js
  > // HTML 代码为
  > // <input type="checkbox" id="my-checkbox" />
  > var cb = document.getElementById('my-checkbox');
  > 
  > cb.addEventListener(
  >   'click',
  >   function (e){ e.preventDefault(); },
  >   false
  > );
  > ```

- Event.stopPropagation()

  > **Event.stopPropagation()**
  >
  > 阻止事件在DOM中继续传播，防止再出发定义在别的节点上的监听函数，但不包括当前函数
  >
  > ```js
  > function stopEvent(e) {
  >   e.stopPropagation();
  > }
  > 
  > el.addEventListener('click', stopEvent, false);
  > ```

- Event.stoplmmediatePropagation()

  > **Event.stoplmmediatePropagation()**
  >
  > 阻止同一个事件的其他监听函数被调用，不管是定义在当前节点还是其他节点。
  >
  > ```js
  > function l1(e){
  >   e.stopImmediatePropagation();
  > }
  > 
  > function l2(e){
  >   console.log('hello world');
  > }
  > 
  > el.addEventListener('click', l1, false);
  > el.addEventListener('click', l2, false);
  > ```

- Event.composedPath()

  > **Event.composedPath()**
  >
  > 返回一个数组，成员是事件的最底层节点和一次冒泡进过的所有上层节点。
  >
  > ```js
  > // HTML 代码如下
  > // <div>
  > //   <p>Hello</p>
  > // </div>
  > var div = document.querySelector('div');
  > var p = document.querySelector('p');
  > 
  > div.addEventListener('click', function (e) {
  >   console.log(e.composedPath());
  > }, false);
  > // [p, div, body, html, document, Window]
  > ```