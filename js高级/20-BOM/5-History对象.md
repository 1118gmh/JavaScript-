### History对象

> window.history属性指向History对象，表示当前窗口的浏览历史。
>
> History对象保存了当前窗口访问过的所有页面网址。
>
> ```js
> window.history.length //3 表示当前窗口访问过3个网址
> //浏览器不允许脚本读取这些网址，但是允许在地址间导航
> history.back() //后退到前一个网址
> history.go(-1) //后退到前一个网址
> ```

**属性**

- History.lenght：当前窗口访问过的网址数
- History.state：HIstory堆栈最上层的状态值

```js
window.history.length //1
//History对象的当前状态
window.history.state //undefined
```

**方法**

- History.back() / History.forward() / History.go()

  > - `History.back()`：移动到上一个网址。
  > - `History.forward()`：移动到下一个网址。
  > - `History.go()`：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如`go(1)`相当于`forward()`，`go(-1)`相当于`back()`。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为`0`，相当于刷新当前页面。

- History.pushState()

  > window.history.pushState(state,title,url)
  >
  > 在历史中添加一条记录
  >
  > 使用完该方法后History对象变化，地址栏有反应，但是不会刷新页面
  >
  > - `state`：一个与添加的记录相关联的状态对象，主要用于`popstate`事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填`null`。
  > - `title`：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
  > - `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
  >
  > ```js
  > history.pushState(null, '', 'https://twitter.com/hello');
  > ```

- History.replaceState()

  > 用于修改History对象的当前记录，与pushState用法一样。

**popstate事件**

> 每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
>
> 注意，仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
>
> 使用的时候，可以为`popstate`事件指定回调函数。
>
> ```
> window.onpopstate = function (event) {
>   console.log('location: ' + document.location);
>   console.log('state: ' + JSON.stringify(event.state));
> };
> 
> // 或者
> window.addEventListener('popstate', function(event) {
>   console.log('location: ' + document.location);
>   console.log('state: ' + JSON.stringify(event.state));
> });
> ```
>
> 回调函数的参数是一个`event`事件对象，它的`state`属性指向`pushState`和`replaceState`方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。上面代码中的`event.state`，就是通过`pushState`和`replaceState`方法，为当前 URL 绑定的`state`对象。
>
> 这个`state`对象也可以直接通过`history`对象读取。
>
> ```
> var currentState = history.state;
> ```
>
> 注意，页面第一次加载的时候，浏览器不会触发`popstate`事件。