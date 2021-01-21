### EventTarget接口

> 事件的本质是程序各个部分的一种通信方式，意识异步编程的一种实现。
>
> DOM的事件操作都定义在EventTarget接口。
>
> 所有节点对象都部署了这个接口，其他一些需要事件通信的浏览器内置对象（比如，`XMLHttpRequest`、`AudioNode`、`AudioContext`）也部署了这个接口。

**实例方法**

- addEventListener()：绑定事件的监听函数

  > **EventTarget.addEventListener(type,listener,useCapture)**
  >
  > - type：事件名称
  > - listener：监听函数
  > - useCapture：布尔值，表示监听函数是否在捕获阶段触发。（默认为false，表示只在冒泡阶段触发）
  >
  > ```js
  > function hello() {
  >   console.log('Hello world');
  > }
  > var button = document.getElementById('btn');
  > button.addEventListener('click', hello, false);
  > //如果要传参，则需包一层函数
  > function alter(z) {
  >     window.alert(z);
  > }
  > var d = document.getElementById("test"),
  >     a = 3;
  > d.addEventListener('click', function() {
  >     alter(a)
  > }, false);
  > ```

- removeEventListener()：移除事件的监听函数

  > **EventTarget.removeEventListener(type,listener,useCapture)**
  >
  > 注意：移除的监听函数必须是addEventListener方法添加的那个监听函数，必须同一个元素节点，传的第二个参数必须同一个监听函数，传的第三个参数必须一致。
  >
  > ```js
  > div.addEventListener('click', listener, false);
  > div.removeEventListener('click', listener, false);
  > ```

- dispatchEvent()：触发事件

  > **EventTarget.dispatchEvent(event)**
  >
  > 在指定节点上触发指定事件，从而使得监听函数的执行。方法返回Boolean类型，表示是否触发了指定事件。
  >
  > ```js
  > para.addEventListener('click', hello, false);
  > var event = new Event('click');
  > para.dispatchEvent(event);
  > ```