### DOM概述

> **DOM**：document object model 文档对象模型，提供一些属性和方法供我们操作页面中的元素
>
> **节点**：DOM的最小组成单位叫节点。节点有7中类型，分别是：
>
> > - Document：整个文档数的顶层节点
> > - DocumentType：doctype标签，比如：`<DOCTYPE html>`
> > - Element：网页的各种HTML标签，比如：`<body><a>`等
> > - Attr：网页元素属性，比如：`class = "right"`
> > - Text：标签之间或标签包含的文本
> > - Comment：注释
> > - DocumentFragment：文档的片段
>
> **这7种节点类型都继承浏览器提供的原生节点对象Node**
>
> **节点树**：DOM树。
>
> > document节点，代表整个文档。
> >
> > 第一层节点：
> >
> > 文档类型节点`<DOCTYPE html>`、
> >
> > 顶层标签`<html>`（跟节点，其他节点都是根节点的下级）
> >
> > ​								其他节点有三种层级关系：父节点parentNode
> >
> > ​																				子节点childNodes
> >
> > ​																				同级节点sibling
> >
> > ​								DOM提供操作接口，用来获取这三种关系的节点。
> >
> > 比如，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

### Node接口

> 所有DOM节点都继承Node接口，所以拥有一些公共的方法和属性

**公有属性**

> 下面的这些属性都是Node.prototype上的公有属性

- nodeType：获取整数值，表示节点类型
- nodeName：获取节点名称
- nodeValue：获取文本值，返回的是字符串
- 
- parentNode：获取当前节点的父节点（只能是元素节点、文档节点、文档片段节点）
- parentElement：获取当前节点的父元素节点（只能是元素节点）
- 
- childNodes：获取所有的子节点
- childern：获取所有的元素子节点
- firstChild：获取第一个子节点
- lastChild：获取最后一个子节点
- firstElementChild / lastElementChild：获取第一个和最后一个元素子节点（不兼容IE6-8）
- 
- priviousSibling：获取上一个哥哥节点
- nextSibling：获取下一个弟弟节点
- priviousElementSibling / nextElementSibling：获取哥哥和弟弟元素节点（不兼容IE6-8）
- ......

> 常用的几个节点类型的的公有属性

  - 元素节点（元素标签）
    - nodeType：1  对应常量`Node.ELEMENT_NODE`
    - nodeName：大写的标签名
    - nodeValue：null
  - 文本节点
    - nodeType：3  对应常量`Node.TEXT_NODE`
    - nodeName：'#text'
    - nodeValue：文本内容
  - 注释节点
    - nodeType：8  对应常量`Node.COMMENT_NODE`
    - nodeName：'#commen'
    - nodeValue：注释内容
  - 文档节点document
    - nodeType：9  对应常量`Node.DOCUMENT_NODE`
    - nodeName：'#document'
    - nodeValue：null
  - ......

> nodeName和nodeValue这两个属性完全取决于节点的类型，在使用时最好先检测节点的类型
>
> ```js
> if(someNode.nodeType == 1){
>     testNodeName = someNode.nodeName; //nodeName的值是元素的标签名
>     testNodeValue = soneNode.nodeValue;  //nodeValue的值是null
> }
> ```
>
> **childNodes**
>
> 每个节点都有一个 childNodes 属性，其中保存着一个 NodeList 对象。 NodeList  是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。请注意，虽然可以通过方括号语法来访问 NodeList  的值，而且这个对象也有 length 属性，但它并不是 Array 的实例。
>
> ```js
> //类数组
> var selectAll=document.getElementsByTagName("p");
> //检测数据类型
> console.log(Object.toString.call(seletAll));// [Object HTMLCollection]
> //类数组转换为数组 IE678不兼容
> var arrayOfNodes = Array.prototype.slice.call(selectAll);
> //类数组转换为数组 兼容写法
> function convertToArray(nodes){
>     var array = [];
>     try{
>         array = Array.prototype.slice.call(nodes,0);//针对非IE浏览器
>     }catch(e){
>         for(var i = 0;i<nodes.length;i++){
>             array.push(node[i]);
>         }
>     }
>     return array;
> }
> var arrayOfNodes = convertToArray(selectAll);
> ```
>
> ```html
>     <ul id="myList1">
>         <li>Item 1</li>
>         <li>Item 2</li>
>         <li>Item 3</li>
>     </ul>
>     <ul id="myList2"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
>     <script>
>         var test1=document.getElementById("myList1");
>         var test2=document.getElementById("myList2");
>         console.log(test1.childNodes);//[text, li, text, li, text, li, text]
>         console.log(test2.childNodes);//[li, li, li]
>     </script>
> ```
>
> myList1的childNodes是7，myList2的chilNodes是3；(myList1里面有Text 类型)
>
> 如果在myList1中获取全部的li，可以直接用getElementByTagName；
>
> ```js
>     var test1=document.getElementById("myList1");
>     var lis=test1.getElementsByTagName("li");
>     console.log(lis);
> ```
>
> 这样就拿到了，先确定范围，然后通过标签名来获取；还可以判断元素的是否为原来来获取
>
> ```js
>     var test1=document.getElementById("myList1");
>     var ary=[];
>     for(var i=0,len=test1.childNodes.length;i<len;i++){
>         if(test1.childNodes[i].nodeType===1){
>             ary.push(test1.childNodes[i]);
>         }
>     }
>     console.log(ary);
> ```
>
> **Text**类型介绍
>
> ```html
>     <!-- 没有内容，也就没有文本节点 -->
>     <div></div>
>     <!-- 有空格，因而有一个文本节点 -->
>     <div> </div>
>     <!-- 有内容，因而有一个文本节点 -->
>     <div>Hello World!</div>
> ```
>
> **parentNode、firstNode、lastNode、nextSibling、previousSibling**
>
> - 1、父节点的 firstChild 和 lastChild属性分别指向其 childNodes 列表中的第一个和最后一个节点。firstChild等于childNodes[0]，lastChild原理一样；
> - 2、在只有一个子节点的情况下， firstChild 和lastChild 指向同一个节点。如果没有子节点，那么 firstChild 和 lastChild 的值均为 null 。
> - 3、如果列表中只有一个节点，那么该节点的 nextSibling 和 previousSibling 都为 null

**公有方法**

- appendChild
- insertBefore
- replaceChild
- cloneNode
- hasChildNodes

> **appendChild**
>
> 将节点添加到指定容器最后面，返回新增加的节点
>
> **insertBefore**
>
> 将新的节点添加到指定容器中的某个节点的前面
>
> **replaceChild**
>
> 把原有的元素替换replacedNode = parentNode.replaceChild(newChild, oldChild);
>
> **cloneNode**
>
> 复制节点var dupNode = node.cloneNode(blooeanValue);
>
> node是被赋值的节点
>
> dupNode是赋值后的文件；
>
> blooeanValue 是否采用深度克隆
>
> **removeChild**
>
> 删除一个子元素
>
> **hasChildNodes**
>
> 返回一个布尔值，判断当前节点是否包含子节点
>
> ```js
> //动态创建一个div元素，把其赋给box
> let box = document.createElement('div');
> box.id = 'boxActive';
> box.style.width = '200px';
> box.style.height = '200px';
> box.className = 'RED';
> 
> //动态创建一个文本
> let text = document.createTextNode('哈哈哈哈');
> 
> //添加  容器.appendChild
> //将text中内容放到box容器的末尾
> box.appendChild(text);
> //将box元素添加到body容器的末尾
> document.body.appendChild(box);
> 
> //放到指定元素前：容器.insertBefore([指定元素],[新增元素])
> let heihei= document.createTextNode('嘿嘿');
> document.body.insertBefore(heihei,box);
> 
> 
> let box1 = document.querySelector(.box);
> //克隆第一份（深克隆）
> let box2 = box1.cloneNode(true);
> //克隆第二份（浅克隆）
> let box3 = box1.cloneNode(false);
> 
> //容器.removeChild(元素)
> document.body.removeChild(box2);
> ```

### **NodeList接口、HTML Collection接口**

> 节点都是单个对象，有时需要一种数据结构，能够容纳多个节点。DOM 提供两种节点集合，用于容纳多个节点：`NodeList`和`HTMLCollection`。
>
> 这两种集合都属于接口规范。许多 DOM 属性和方法，返回的结果是`NodeList`实例或`HTMLCollection`实例。主要区别是，`NodeList`可以包含各种类型的节点，`HTMLCollection`只能包含 HTML 元素节点。

### ParentNode接口、ChileNode接口

> 节点对象除了继承 Node 接口以外，还拥有其他接口。`ParentNode`接口表示当前节点是一个父节点，提供一些处理子节点的方法。`ChildNode`接口表示当前节点是一个子节点，提供一些相关方法。
>
> 如果当前节点是父节点，就会混入了（mixin）`ParentNode`接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会拥有`ParentNode`接口。
>
> 如果一个节点有父节点，那么该节点就拥有了`ChildNode`接口。

### **Document节点**

> 查看属性和方法

```js
console.dir(document);
```

> 查找元素

```js
console.log(document);
```

**方法**

- getElementById
- getElementsByClassName
- getElementsByName
- getElementsByTagName
- querySelector
- querySelectorAll

> **document.getElementById**
>
> 在整个文档中，通过元素的ID获取这个元素的对象
>
> **document.getElementsByClassName**
>
> 在整个文档中，通过元素class样式类的值来获取一组元素，类数组，IE678不兼容
>
> **document.getElementsByTagName**
>
> 在整个文档中，通过元素的标签名来获取一组元素(HTMLcollection集合)
>
> 获取的是一个类数组，获取的个数可以通过length获取，获取集合的某一个元素，通过对象的索引即可查找；
>
> **document.getElementsByName**
>
> 在整个文档中，通过元素的name值来获取一组元素（NodeList集合），在IE浏览器中，此方法只对表单元素起作用；
>
> **document.querySelector()**
>
>  在整个文档中，通过不同的选择器获取一个元素对象,IE678不兼容
>
> **document.querySelectorAll()**
>
>  在整个文档中，通过不同的选择器获取一组元素对象集合，IE678不兼容；
>
> **document.documentElement 获取整个HTML对象**
>
> **document.body 获取整个body对象**
>
> ```js
> //1. document.getElementById()
> let tabBox = document.getElementById('tabBox');
> 
> //2. [context].getElementsByTagName()、[context].getElementsByClassName()
> //这两种获取到的是元素集合，想要操作某个元素，需要根据索引取出来才可以使用
> let tabBox = document.getElementsByClassName('tabBox')[0];
> console.log(tabBox);
> 
> //3. querySelector获取的是元素对象，哪怕页面中有多个符合，也只获取一个元素对象
> //querySelectorAll获取的是元素集合，哪怕页面只有一个符合，获取的也是一个集合
> let tabBox = document.querySelector('.tabBox');
> 
> let tabBox = document.querySelectorAll('.tabBox');
> 
> let navList = document.querySelectorAll('.tab li');
> 
> let navList = tabBox.querySelectorAll('.tab li');
> console.log(navList);
> 
> //4. document.getElementsByName()
> var sexList = document.getElementsByName('sex');
> console.log(sexList);
> ```
>
> **特殊集合**
>
> 除了属性和方法，document对象还有一个特殊的集合，这些集合都是HTMLCollection对象，为了访问文档常用的部分提供的快捷方式；
>
> 正常工作中，很少直接这么用的；
>
> - document.anchors 包含文档中所有带name特性的元素；
> - document.links 包含文档中所有带href特性的元素，
> - document.forms 包含文档中所有带form的元素，与document.getElementsByName(“form”)相同；
> - document.imges 包含文档中所有带![img]()的元素，与document.getElementsByName(“img”)相同；
>
> **文档写入**
>
> 将输出流写入到网页中，有4个方法；
>
> - write(string) 向文档中写入内容
> - writeIn(string) 在字符串的末尾添加一个换行符(\n)；
> - open()：清除当前文档所有内容，使得文档处于可写状态
> - close()
>
> write和writeIn
>
> ```html
>     <!doctype html>
>     <htm>
>     <head>
>         <meta charset="UTF-8">
>         <title>Document</title>
>         <script>
>             window.onload=function(){
>                 document.write("<strong>"+(new Date()).toString()+"</strong>");
>                 document.write("22222");
>                 document.writeln("11111");
>                 document.writeln("11111");
>                 document.write("22222");
>                 document.write("22222");
>             };
>         </script>
>     </head>
>     <body>
>     <p>now time is:</p>
>     </body>
>     </htm>
> ```
>
> open()和close()分别用于打开和关闭网页的输出流；如果是加载期间使用write()或者writeIn()方法，则不需要用到这两个方法；
>
> **文档的子节点**
>
> - document.documentElement;//拿到这个标签；
> - document.body//拿到body这个层的标签；
>
> 主要就是这两个方法的，当然也可以用别的方法来获取同样的效果的；
>
> 比如
>
> ```
> document.childNodes[0];document.firstChild;
> ```
>
> 这两个都可以获取到html标签；
>
> **文档信息**
>
> - document.title 设置文档的标题
> - document.URL 获取或者设置完整的URL
> - document.domain 获取或者设置域名
> - document.referrer 取得来源页面的URL

### **Element节点**

- getElementsByName()
- getElementsByTagName()
- querySelector()
- querySelectorAll()

> Element的类型，nodeType的值为1、nodeName为元素的标签名，nodeValu是null；
>
> ```html
>     <div id="test">这是一个ID为test的div内容</div>
>     <script>
>         var test=document.getElementById("test");
>   	console.log(test.nodeType,test.nodeName,test.nodeValue,test.tagName);//1 "DIV" null "DIV"
>     </script>
> ```
>
> 返回的标签名是大写的DIV；一般比较都会转成小写然后比较；如下；
>
> ```js
>     if(test.tagName.toLowerCase()=="div"){
>         console.log("目标的元素是div标签，开始执行代码");
>     }
> ```
>
> **HTML元素**
>
> 所有的HTML元素都是由HTMLElement类型表示，如果不是直接通过这个类型，也是通过它的子类型表示；可以输出看下，HTMlElement类型继承自ELement类型的；
>
> ```html
>     <div id="test">这是一个ID为test的div内容</div>
>     <script>
>         var test=document.getElementById("test");
>         console.log("test本身："+test);//div#test
>         console.log("test向上找1级："+test.__proto__);//HTMLDivElement
>         console.log("test向上找2级："+test.__proto__.__proto__);//HTMLElement
>         console.log("test向上找3级："+test.__proto__.__proto__.__proto__);//Element
>         console.log("test向上找4级："+test.__proto__.__proto__.__proto__.__proto__);//Node
>         console.log("test向上找5级："+test.__proto__.__proto__.__proto__.__proto__.__proto__);//EventTarget
>         console.log("test向上找6级："+test.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);//Object
>         console.log("test向上找7级："+test.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__);//null
>         console.dir(test);//顺着原型链查找；
>     </script>
> ```
>
> 每个HTML元素都存在下面的标准特性
>
> - id 元素在文档中的唯一标识符
> - title 有关元素的附加说明信息，鼠标放上去会显示，（以前我以为只有a标签才有，其实是都有的）
> - lang 元素内容的语言代码，很少使用
> - dir 语言的方向，值为ltr或者rtl，很少使用（left-to-right和right-to-left）;rtl可以起到右对齐的效果；
> - className 与元素的class特性对应，是元素指定的CSS类，没有将这个属性命名为class，是因为class是ECMAscript的保留字；【*】
>
> **属性操作特性**
>
> - setAttribute / getAttribute / removeAttribute：设置获取移除元素的自定义属性信息（这种方式是把自定义属性放到元素结构上）
>
> ```js
> var btnList = document.querySelectorAll('button');
> for (var i = 0; i < btnList.length; i++) {
>     //设置自定义属性：setAttribute
>     btnList[i].setAttribute('myindex', i);
>     btnList[i].onclick = function() {
>         //获取自定义属性：getAttribute
>         alert(this.getAttribute('myindex'));
>     }
> }
> ```
>
> **创建元素**
>
> document.creatElement()方法，可以创建新元素，接受一个参数，就是要创建的元素，参数可以是标签名
>
> - div
>
> 一般都使用标签名；
>
> 创建的元素属于游离状态，还没有被添加到文档树中，因为新建的元素并不会马上看到，可以使用appendChild,inserBefore,replaceChild()方法，
>
> ##### 获取元素样式和操作样式
>
> > 修改元素样式：
> >
> > [ELEMENT].style.xxx = xxx;     //修改和设置它的行内样式
> >
> > [ELEMENT].className = xxx;   //设置样式类
> >
> > 获取元素的样式：
> >
> > console.log([ELEMENT].style.xxx);  //获取的是当前元素写在行内上的样式

### 属性操作

> HTML 元素包括标签名和若干个键值对，这个键值对就称为“属性”（attribute）。

- Element.attributes属性

  > 元素对象有一个`attributes`属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。

> HTML 元素的标准属性（即在标准中定义的属性），会自动成为元素节点对象的属性。

```js
var a = document.getElementById('test');
a.id // "test"
a.href // "http://www.example.com/"
```

> 这些属性都是可写的。

```js
var img = document.getElementById('myImage');
img.src = 'http://www.example.com/image.jpg';
```

> 元素节点提供六个方法，用来操作属性

- `getAttribute()`：返回当前元素节点的指定属性。
- `getAttributeNames()`：返回一个数组，成员是当前元素的所有属性的名字。
- `setAttribute()`：为当前元素节点新增属性。
- `hasAttribute()`：返回一个布尔值，表示当前元素节点是否包含指定属性。
- `hasAttributes()`：返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回`false`，否则返回`true`。
- `removeAttribute()`：移除指定属性。该方法没有返回值

### **Text节点**

> - document.createTextNode() 创建新文本节点
> - normalize() 相邻文本节点合并
> - splitText() 分割文本节点
>
> **document.createTextNode()**
>
> 创建新文本节点，接收一个参数，要插入节点中的文本，（作为参数的文本将按照HTML或者XML的格式进行编码）
>
> ```js
>     var ele=document.createElement("div");
>     var textNode=document.createTextNode('<strong>hello</strong> word');
>     var anotherTextNode = document.createTextNode("lee!");
>     ele.className="message";
>     ele.appendChild(textNode);
>     ele.appendChild(anotherTextNode);
>     document.body.appendChild(ele);
> ```
>
> 如果两个文本节点是相邻的同胞节点，那么这两个节点中的文本就会连起来显示，中间不会有空格。
>
> **normalize**
>
> 如果在一个包含两个或多个文本节点的父元素上调用 normalize() 方法，则会将所有文本节点合并成一个节点，结果节点的 nodeValue 等于将合并前每个文本节点的 nodeValue 值拼接起来的值。
>
> ```js
>     var ele=document.createElement("div");
>     var textNode=document.createTextNode('<strong>hello</strong> word');
>     var anotherTextNode = document.createTextNode("lee!");
>     ele.className="message";
>     ele.appendChild(textNode);
>     ele.appendChild(anotherTextNode);
>     document.body.appendChild(ele);
>     console.log("childNodes的长度："+ele.childNodes.length+",第一个节点值是"+ele.firstChild.nodeValue);//childNodes的长度：2,第一个节点值是<strong>hello</strong> word
>     ele.normalize();
>     console.log("childNodes的长度："+ele.childNodes.length+",第一个节点值是"+ele.firstChild.nodeValue);//childNodes的长度：1,第一个节点值是<strong>hello</strong> wordlee!
> ```
>
> **splitText()**
>
> 和normalize()相反的方法;按照指定的位置分割 nodeValue 值。
>
> - 原来的文本节点将包含从开始到指定位置之前的内容;(不包含所传的索引)
> - 新文本节点将包含剩下的文本。
>
> ```js
> var ele=document.createElement(“div”); var textNode=document.createTextNode(‘hello word’);
> 
> ele.className=“message”; ele.appendChild(textNode); document.body.appendChild(ele);
> 
> console.log(“childNodes的长度：”+ele.childNodes.length+“,第一个节点值是”+ele.firstChild.nodeValue);//childNodes的长度：2,第一个节点值是**hello** word var newNode=ele.firstChild.splitText(2);  console.log(ele.childNodes.length);//2  console.log(ele.firstChild.nodeValue);//he  console.log(newNode.nodeValue);//llo word
> ```





```js
var box = document.getElementById('box');
/*
 *childern：获取当前元素对象的所有元素子节点
 *@params 
 *   context 元素对象
 *@return
 *   res 元素子节点的数组
 *by gaominghui on 2020/9/3
 */
function childern(context){
    //1.先获取所有的子节点
    var res = [],
        nodeList = context.childNodes;
    //遍历循环所有的子节点，找出元素子节点（nodeType===1），存储到RES中即可
    for(var i = 0;i<nodeList.length;i++){
        var item = nodeList[i];
        item.nodeType ===1?res.push(item):null;
    }
    return res;
}
console.log(childern(box));

var fangqi = document.getElementById('fangqi');
/*
 *childern：获取哥哥元素节点
 *@params 
 *   context 元素对象
 *@return
 *   res 哥哥元素节点
 *by gaominghui on 2020/9/3
 */
function prev(context){
    var pre = context.previousSibling;
    while(pre.nodeType !==1){
        pre = pre.previousSibling;
    }
    return pre;
}
console.log(prev(fangqi));
```

