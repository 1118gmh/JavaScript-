### CSS操作

#### 1、style样式属性的操作

> 操作 CSS 样式最简单的方法，就是使用网页元素节点的`getAttribute()`方法、`setAttribute()`方法和`removeAttribute()`方法，直接读写或删除网页元素的`style`属性。

```js
div.setAttribute(
  'style',
  'background-color:red;' + 'border:1px solid black;'
);
```

上面的代码相当于下面的 HTML 代码。

```html
<div style="background-color:red; border:1px solid black;" />
```

`style`不仅可以使用字符串读写，它本身还是一个对象，部署了 CSSStyleDeclaration 接口（详见下面的介绍），可以直接读写个别属性。

```js
e.style.fontSize = '18px';
e.style.color = 'black';
```

详情参考：https://wangdoc.com/javascript/dom/css.html

#### 2、设置和获取样式

> 获取样式

```
element.style.value
```

```
window.ComputedStyle(element,string)[value] //IE不支持
```

```
window.currentStyle[value] //IE专有
```

> 设置样式

```
element.style.属性名 = "属性值";
```

#### 3、操作样式表

> `StyleSheet`接口代表网页的一张样式表，包括`<link>`元素加载的样式表和`<style>`元素内嵌的样式表。
>
> `document`对象的`styleSheets`属性，可以返回当前页面的所有`StyleSheet`实例（即所有样式表）。它是一个类似数组的对象。
>
> ```js
> var sheets = document.styleSheets;
> var sheet = document.styleSheets[0];
> sheet instanceof StyleSheet // true
> ```
>
> 如果是`<style>`元素嵌入的样式表，还有另一种获取`StyleSheet`实例的方法，就是这个节点元素的`sheet`属性。
>
> ```js
> // HTML 代码为 <style id="myStyle"></style>
> var myStyleSheet = document.getElementById('myStyle').sheet;
> myStyleSheet instanceof StyleSheet // true
> ```

**StyleSheet的实例属性**

- disabled

  > `StyleSheet.disabled`返回一个布尔值，表示该样式表是否处于禁用状态。

- href

  > `Stylesheet.href`返回样式表的网址。对于内嵌样式表，该属性返回`null`。该属性只读。

- media

  > `StyleSheet.media`属性返回一个类似数组的对象（`MediaList`实例），成员是表示适用媒介的字符串。表示当前样式表是用于屏幕（screen），还是用于打印（print）或手持设备（handheld），或各种媒介都适用（all）。该属性只读，默认值是`screen`。

- title

  > `StyleSheet.title`属性返回样式表的`title`属性

- type

  > `StyleSheet.type`属性返回样式表的`type`属性，通常是`text/css`。

- ownerNode 

  > `StyleSheet.ownerNode`属性返回`StyleSheet`对象所在的 DOM 节点，通常是`<link>`或`<style>`。对于那些由其他样式表引用的样式表，该属性为`null`。

- parentStyleSheet 

  > CSS 的`@import`命令允许在样式表中加载其他样式表。`StyleSheet.parentStyleSheet`属性返回包含了当前样式表的那张样式表。如果当前样式表是顶层样式表，则该属性返回`null`。

- cssRules

  >`CSSStyleSheet.cssRules`属性指向一个类似数组的对象（`CSSRuleList`实例），里面每一个成员就是当前样式表的一条 CSS 规则。使用该规则的`cssText`属性，可以得到 CSS 规则对应的字符串。
  >
  >```js
  >var sheet = document.querySelector('#styleElement').sheet;
  >
  >sheet.cssRules[0].cssText
  >// "body { background-color: red; margin: 20px; }"
  >
  >sheet.cssRules[1].cssText
  >// "p { line-height: 1.4em; color: blue; }"
  >```

- ownerRule

  > 有些样式表是通过`@import`规则输入的，它的`ownerRule`属性会返回一个`CSSRule`实例，代表那行`@import`规则。如果当前样式表不是通过`@import`引入的，`ownerRule`属性返回`null`。

**实例方法**

- insertRule()

  > `CSSStyleSheet.insertRule`方法用于在当前样式表的插入一个新的 CSS 规则。
  >
  > ```js
  > var sheet = document.querySelector('#styleElement').sheet;
  > sheet.insertRule('#block { color: white }', 0); //在样式表位置0处插入
  > sheet.insertRule('p { color: red }', 1); //在样式表位置1处插入
  > ```

- deleteRule()

  > `CSSStyleSheet.deleteRule`方法用来在样式表里面移除一条规则，它的参数是该条规则在`cssRules`对象中的位置。该方法没有返回值。
  >
  > ```js
  > document.styleSheets[0].deleteRule(1);
  > ```

**实例**

> 网页添加样式表有两种方式。一种是添加一张内置样式表，即在文档中添加一个`<style>`节点。

```js
// 写法一
var style = document.createElement('style');
style.setAttribute('media', 'screen');
style.innerHTML = 'body{color:red}';
document.head.appendChild(style);

// 写法二
var style = (function () {
  var style = document.createElement('style');
  document.head.appendChild(style);
  return style;
})();
style.sheet.insertRule('.foo{color:red;}', 0);
```

> 另一种是添加外部样式表，即在文档中添加一个`<link>`节点，然后将`href`属性指向外部样式表的 URL。

```js
var linkElm = document.createElement('link');
linkElm.setAttribute('rel', 'stylesheet');
linkElm.setAttribute('type', 'text/css');
linkElm.setAttribute('href', 'reset-min.css');

document.head.appendChild(linkElm);
```

### 3、JS盒子模型属性

> 基于一些属性和方法，让我们能够获取到当前元素的样式信息，都是Element的实例属性。例如：clientWidth、offsetWidth等
>
> 注意：13个属性中，只有scrollTop和scrollleft”可读写“，其余”只读“；
>
> 属性：
>
> - client
>
>   - width / height：可视化区域宽高（内容宽度+左右padding）
>   - top / left：获取盒子上边框和左边框的大小
>
> - offset
>
>   - width/height：在client的基础上加上border == 盒子本身宽高
>   - top/left：距离父参照物的上、左偏移量
>   - parent:返回最靠近当前元素的、并且 CSS 的`position`属性不等于`static`的上层元素。
>
> - scroll
>
>   - width/height：
>
>     ​		在没有内容溢出的情况下，获取的结果和client一样；
>
>     ​		在有内容溢出的情况下，获取的结果约等于真实内容的宽高（上/左padding + 真实内容的宽度/高度）
>
>     ​		//1、不同浏览器获取的结果不同
>
>     ​		//2、overflow属性值对最后的结果会产生一定的影响
>
>   - top/left：竖向/横向滚动条卷曲的高度/宽度
>
>     ​		min = 0     max = 整个的高度scrollHeight - 一屏幕高度clientHeight
>
> 方法：window.getComputedStyle([ELEMENT],[伪类]) / [ELEMENT].currentStyle

> 传统的CSS盒子模型属性：内容的宽高width/height、内填充padding-top/-right/-bottom/-left、边框border、外边框margin
>
> 盒子宽度：width+左右padding+左右border
>
> CSS3中新盒子模型属性：
>
> ​			box-sizing:content-box（默认传统盒子模型）
>
> ​			border-box（新盒子模型）（宽高即为盒子最后的大小）

```js
let box = document.getElementById('box');
//获取盒子可视化宽高（内容看宽度+左右padding）
//1.内容溢出与否对他无影响
//2.获取结果无单位
//3.获取结果是整数，四舍五入
console.log(box.clientwidth);
console.log(box.clientheight);
//获取当前页面一屏幕的区域的宽高
let winW = document.documentElement.clientWidth;//一屏幕宽
let winH = document.documentElement.clientHeight;//一屏幕高
//css实现盒子居中：1.margin；2、position；3、flex；4、transform
//js实现盒子居中：（一屏幕的宽度-盒子的宽度）/2
box.style.position = 'absolute';
box.style.left = (winW-300)/2 + 'px';
box.style.top = (winH-300)/2 + 'px';
```

**偏移量相关**

> offsetLeft 和 offsetTop 属性与包含元素有关，包含元素的引用保存在 offsetParent属性中。 offsetParent 属性不一定与parentNode 的值相等。
>
> **offsetParent取决于position，parentNode取决于DOM结构**

> 在IE中有些问题，封一个方法，可以直接获取到元素的所有绝对偏移量；

```js
function offset(curEle) {//获取偏移量；
    var par = curEle.offsetParent,
        left = curEle.offsetLeft,
        top = curEle.offsetTop;
    while (par) {
        left += par.offsetLeft;
        top += par.offsetTop;
        if (navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
            left += par.clientLeft;
            top += par.clientTop;
        }
        par = par.offsetParent;
    }
    return {left: left, top: top};
}
```

**滚动相关的**

scrollWidth / scrollHeight

> 作用：用于确定元素内容的实际大小
>
> **在确定文档的总高度时，必须取得 scrollWidth / clientWidth 和scrollHeight/clientHeight 中的最大值,才能保证在跨浏览器的环境下得到精确的结果**
>
> ```js
> var docHeight=Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
> var docWidth=Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);
> ```
>
> **scrollLeft / scrollTop**可设置的；
>
> 一般用在做返回顶部的功能；如果当前和顶部的距离不是0，说明已经滚动了；设置他的scrollTop为0就可以返回原位了；
>
> ```js
> //返回html文档的顶部
> scrollToTop(document.documentElement);
> //返回某个元素的顶部
> function scrollToTop(element){
>     if(element.scrollTop != 0){
>         element.scrollTop = 0;
>     }
> }
> ```

**Element.getBoundingClientRect()**

> 这个方法返回会一个矩形对象，包含 8个属性： 
>
> left 、 top 、 right 和 bottom ：盒子上、左、右、下距离视口（屏幕上看得见的）距离
>
> width、height：盒子本身宽高
>
> xy：盒子左上角相对于视口x、y
>
> 这些属性给出了元素在页面中相对于视口的位置;
>
> 如果用offset和offsetParent配合做距离页面的距离，需要做很多兼容；
>
> 但是用getBoundingClientRect方法比较简单；但也是有兼容性问题的；

> 可以自己写一个可以兼容所有浏览器的getBoundingClientRect()方法

```js
function getBoundingClientRect(element){
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect){
        if (typeof arguments.callee.offset != "number"){
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}
function getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}
function getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
        actualTop += current. offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}
```

