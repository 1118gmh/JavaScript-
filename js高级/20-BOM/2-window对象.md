### window对象

> window对象指当前的浏览器窗口。
>
> 如果有未声明的变量，则默认就是顶层对象window的属性。
>
> ```js
> a = 1;
> window.a // 1
> ```

### window对象的属性

- window.name：表示当前浏览器窗口的名字
- window.closed / window.opener：表示当前窗口是否关闭、表示当前窗口的父窗口
- window.self / window.window：表示窗口本身
- window.frames / window.length：表示页面内所有框架窗口的类数组集合、表示当前网页包含的框架总数
- window.frameElement：表示当前窗口（当前窗口嵌在另一个网页时）所在的那个元素节点。
- window.top  / window.parent：表示最顶层窗口、表示父窗口
- window.devicePielRatio：表示一个css像素的大小与一个物理像素的大小之间的比率。
- window.screenX / window.screenY / window.innerHeight / window.innerWidth / window.outerHright / window.outerWidth / window.scrollX / window.scrollY /pageXOffset / pageYOffset ：位置大小属性
- 组件属性：这些对象的visible属性表示这些组件是否可见
  - window.locationbar：地址栏对象
  - window.menubar：菜单栏对象
  - window.scrollbars：窗口滚动条对象
  - window.toolbar：工具栏对象
  - window.statusbar：状态栏对象
  - window.statusbar：状态栏对象
  - window.personalbar：用户安装的个人工具栏对象
- 全局对象属性：
  - window.document：指向document对象
  - window.location：指向location对象
  - window.navigator：
  - window.history
  - window.localStorage
  - window.sessionStorage
  - window.console
  - window.screen
- window.isSecureContext：判断当前窗口是否处于加密环境。（如果是http协议，则为true）

### window对象的方法

1. window.alert() / window.prompt() / window.confirm()

   > 弹出不同的对话框
   >
   > **window.alert()**
   >
   > 弹出一个只有“确定”按钮的对话框，用来通知用户某些信息。
   >
   > ```js
   > window.alert('Hello World');
   > ```
   >
   > **window.prompt()**
   >
   > 弹出有文本输入框、“确定”、“取消”、按钮的对话框，返回值是文本内容，用来获取用户输入的数据。
   >
   > ```js
   > var result = prompt('您的年龄？', 25)
   > ```
   >
   > **window.confirm()**
   >
   > 弹出一个只有“确定”、“取消”按钮的对话框，返回值为Boolean，用来征询用户是否同意。
   >
   > 这三个方法都具有堵塞效应，一旦弹出对话框，整个页面就是暂停执行，等待用户做出反应。

2. window.open() / window.close() / window.stop()

   > **window.open(url,windowName,[windowFeatures])**
   >
   > 新建一个浏览器窗口
   >
   > ```js
   > var popup = window.open(
   >   'somepage.html',
   >   'DefinitionsWindows',
   >   'height=200,width=200,location=no,status=yes,resizable=yes,scrollbars=yes'
   > );
   > ```
   >
   > **window.close()**
   >
   > 关闭当前窗口。（一般用于关闭window.open方法创建的窗口）
   >
   > **window.stop()**
   >
   > 停止加载图像、视频等正在加载的对象

3. window.moveTo() / window.moveBy()

   > **window.moveTo()**
   >
   > 移动浏览器到指定位置
   >
   > ```js
   > window.moveTo(100,200)
   > ```
   >
   > **window.moveBy()**
   >
   > 移动窗口到一个相对位置
   >
   > ```js
   > window.moveBy(25,50);//将窗口向右移25像素，向下移动50像素
   > ```
   >
   > 这两个方法不能随便使用，得在该窗口是用`window.open()`方法新建的，并且窗口里只有它一个 Tab 页

4. window.resizeTo() / window.resizeBy()

   > **window.resizeTo()**
   >
   > 用于缩放窗口到指定大小
   >
   > ```js
   > window.resizeTo(window.screen.availWidth,window.screen.availHeight);//缩放到屏幕可用区域的一半宽度和高度
   > ```
   >
   > **window.resizeBy()**
   >
   > 用于缩放窗口
   >
   > ```js
   > window.resize(-200,-200); //宽高缩小200像素
   > ```

5. window.scrollTo() / window.scroll() / window.scrillBy()

   > **window.scrollTo(x-coord,y-coord)**
   >
   > 将文档滚动到指定位置
   >
   > **window.scroll()**是window.scrollTo()的别名
   >
   > **window.scrollBy()**
   >
   > 将网页滚动指定距离
   >
   > ```js
   > window.scrollBy(0,window.innerHeight);//将网页向下滚动一屏
   > ```

6. window.print()

   > **window.print()**
   >
   > 跳出对话框，与用户菜单里面的打印命令效果相同
   >
   > ```js
   > //先判断是否支持打印功能（非桌面设备可能没有打印功能）
   > if(typeof window.print === 'function'){
   >     //支持的话
   >     document.getElementById('printLink').onclick = function(){
   >         window.print();
   >     }
   > }
   > ```

7. window.focus() / window.blur()

   > **window.focus()**
   >
   > 激活窗口，使窗口获取焦点，出现在其他窗口前面
   >
   > ```js
   > var popup = window.open('popup.html'.'popup Window');
   > if((popup !== null) && !popup.close){
   >     popup.focus();
   > }
   > ```
   >
   > **window.blur()**
   >
   > 将焦点从focus移除

8. window.getSelection()

   > **window.getSelection()**
   >
   > 返回一个Selection对象，表示用户现在选中的文本
   >
   > ```js
   > var selObj = window.getSelection();//选中的对象
   > var selText = selObj.toString();//选中的文本
   > ```

9. window.getComputedStyle() / window.matchMedia()

   > **window.getComputedStyle()**
   >
   > 接收元素节点作为参数，返回一个包含该元素的最终样式信息的对象
   >
   > **window.matchMedia()**
   >
   > 检查css的mediaQuery语句

10. window.requestAnimmationFrame()

    > **window.requestAnimationFrame(callback)**
    >
    > 推迟某个函数到下一次重流时执行，执行完才会进行下次重绘

11. window.requestldleCallback()

    > **window.requestldleCallback()**
    >
    > 将某个函数推迟到系统资源空闲时执行。

### 事件

1. load事件和onload属性

   > load事件发生在浏览器窗口加载完毕时，
   >
   > window.onload属性可以指定这个事件的回调函数

2. error事件和onerror属性

   > 浏览器发生错误时，会触发window对象的error事件。
   >
   > 可以通过window.onerror属性对该事件指定回调函数。
   >
   > ```js
   > window.onerror = function (message, filename, lineno, colno, error) {
   >   console.log("出错了！--> %s", error.stack);
   > };
   > /*
   > 5个参数：（老式前3个）
   > 出错信息
   > 出错脚本的网址
   > 行号
   > 列号
   > 错误对象
   > */
   > ```

3. window对象的事件监听属性

   > 除了具备元素节点都有的 GlobalEventHandlers 接口，`window`对象还具有以下的事件监听函数属性。
   >
   > - `window.onafterprint`：`afterprint`事件的监听函数。
   > - `window.onbeforeprint`：`beforeprint`事件的监听函数。
   > - `window.onbeforeunload`：`beforeunload`事件的监听函数。
   > - `window.onhashchange`：`hashchange`事件的监听函数。
   > - `window.onlanguagechange`: `languagechange`的监听函数。
   > - `window.onmessage`：`message`事件的监听函数。
   > - `window.onmessageerror`：`MessageError`事件的监听函数。
   > - `window.onoffline`：`offline`事件的监听函数。
   > - `window.ononline`：`online`事件的监听函数。
   > - `window.onpagehide`：`pagehide`事件的监听函数。
   > - `window.onpageshow`：`pageshow`事件的监听函数。
   > - `window.onpopstate`：`popstate`事件的监听函数。
   > - `window.onstorage`：`storage`事件的监听函数。
   > - `window.onunhandledrejection`：未处理的 Promise 对象的`reject`事件的监听函数。
   > - `window.onunload`：`unload`事件的监听函数。

### 多窗口操作

> 由于`<iframe>`元素的使用，导致一个网页可以形成多个窗口。若子窗口又嵌入别的网页，则形成多级窗口

1. 窗口的引用

   > 各个窗口之中的脚本，可以引用其他窗口。浏览器提供了一些特殊变量，用来返回其他窗口。
   >
   > - `top`：顶层窗口，即最上层的那个窗口
   > - `parent`：父窗口
   > - `self`：当前窗口，即自身
   >
   > 下面代码可以判断，当前窗口是否为顶层窗口。
   >
   > ```
   > if (window.top === window.self) {
   >   // 当前窗口是顶层窗口
   > } else {
   >   // 当前窗口是子窗口
   > }
   > ```
   >
   > 下面的代码让父窗口的访问历史后退一次。
   >
   > ```
   > window.parent.history.back();
   > ```
   >
   > 与这些变量对应，浏览器还提供一些特殊的窗口名，供`window.open()`方法、`<a>`标签、`<form>`标签等引用。
   >
   > - `_top`：顶层窗口
   > - `_parent`：父窗口
   > - `_blank`：新窗口
   >
   > 下面代码就表示在顶层窗口打开链接。
   >
   > ```
   > <a href="somepage.html" target="_top">Link</a>
   > ```

2. iframe元素

   > 对于`iframe`嵌入的窗口，`document.getElementById`方法可以拿到该窗口的 DOM 节点，然后使用`contentWindow`属性获得`iframe`节点包含的`window`对象。
   >
   > ```js
   > var frame = document.getElementById('theFrame');
   > var frameWindow = frame.contentWindow;
   > ```
   >
   > 上面代码中，`frame.contentWindow`可以拿到子窗口的`window`对象。然后，在满足同源限制的情况下，可以读取子窗口内部的属性。
   >
   > ```js
   > // 获取子窗口的标题
   > frameWindow.title
   > ```
   >
   > iframe元素的contentDocument属性 ，可以拿到子窗口的document对象。
   >
   > ```js
   > var frame = document.getElementById('theFrame');
   > var frameDoc = frame.contentDocument;
   > 
   > // 等同于
   > var frameDoc = frame.contentWindow.document;
   > ```
   >
   > \<iframe\>元素遵守同源政策，只有当父窗口与子窗口在同一个域时，两者之间才可以用脚本通信，否则只有使用window.postMessage方法。
   >
   > \<iframe\>窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口。
   >
   > ```js
   > if (window.parent !== window.self) {
   >   // 当前窗口是子窗口
   > }
   > ```
   >
   > \<iframe\>窗口的window对象，有一个frameElement属性，返回\<iframe\>在父窗口中的 DOM 节点。对于非嵌入的窗口，该属性等于null。
   >
   > ```js
   > var f1Element = document.getElementById('f1');
   > var f1Window = f1Element.contentWindow;
   > 
   > f1Window.frameElement === f1Element // true
   > window.frameElement === null // true
   > ```

3. window.frames属性

   > `window.frames`属性返回一个类似数组的对象，成员是所有子窗口的`window`对象。
   >
   > 另外，如果`<iframe>`元素设置了`name`或`id`属性，那么属性值会自动成为全局变量，并且可以通过`window.frames`属性引用，返回子窗口的`window`对象。
   >
   > ```js
   > // HTML 代码为 <iframe id="myFrame">
   > window.myFrame // [HTMLIFrameElement]
   > frames.myframe === myFrame // true
   > ```
   >
   > 另外，`name`属性的值会自动成为子窗口的名称，可以用在`window.open`方法的第二个参数，或者`<a>`和`<frame>`标签的`target`属性。