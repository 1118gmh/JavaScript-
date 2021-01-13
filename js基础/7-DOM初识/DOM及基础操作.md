### DOM操作-常用操作元素的属性和方法

> DOM：document object model 文档对象模型，提供一些属性和方法供我们操作页面中的元素

##### 获取DOM元素的方法

- document.getElementById()

  > 在指定文档中，基于元素的ID或者这个元素对象

- [context].getElementsByTagName()

  > 在指定上下（容器）文中，通过标签获取一组元素集合

- [context].getElementsByClassName()

  > 在指定上下文中，通过样式类名获取一组元素（不兼容ie678）

- document.getElementsByName()

  > 在整个文档中，通过标签的NAME属性值获取一组元素集合（在IE中只有表单元素的NAME才能识别，所以我们一般只引用于表单元素的处理）

- document.head / document.body / document.documentElement

  > 属性，获取页面中的HEAD/BODY/HEML三个元素

- [context].querySelector([selector])

  > 在指定上下文中，通过选择器获取到指定的元素对象

- [context].querySelectorAll([selector])

  > 在指定上下文中，通过选择器获取到指定的元素集合

  ```javascript
  //=>querySelector / querySelectorAll 不兼容IE6-8
  let box = document.querySelector('#box');
  let links = box.querySelectorAll('a');
  let aas = document.querySlenctorAll('.aa');
  ```

  ```js
//1. document.getElementById()
  let tabBox = document.getElementById('tabBox');
  
  //2. [context].getElementsByTagName()、[context].getElementsByClassName()
  //这两种获取到的是元素集合，想要操作某个元素，需要根据索引取出来才可以使用
  let tabBox = document.getElementsByClassName('tabBox')[0];
  console.log(tabBox);
  
  //3. querySelector获取的是元素对象，哪怕页面中有多个符合，也只获取一个元素对象
  //querySelectorAll获取的是元素集合，哪怕页面只有一个符合，获取的也是一个集合
  let tabBox = document.querySelector('.tabBox');
  
  let tabBox = document.querySelectorAll('.tabBox');
  
  let navList = document.querySelectorAll('.tab li');
  
  let navList = tabBox.querySelectorAll('.tab li');
  console.log(navList);
  
  //4. document.getElementsByName()
  var sexList = document.getElementsByName('sex');
  console.log(sexList);
  ```
  
##### JS中的节点和描述节点之间关系的属性

  > 节点：Node
  >
  > 节点集合：NodeList（getElementsByName/querySelectorAll获取的都是元素节点集合）

  - 元素节点（元素标签）
    - nodeType：1
    - nodeName：大写的标签名
    - nodeValue：null
  - 文本节点
    - nodeType：3
    - nodeName：'#text'
    - nodeValue：文本内容
  - 注释节点
    - nodeType：8
    - nodeName：'#commen'
    - nodeValue：注释内容
  - 文档节点document
    - nodeType：9
    - nodeName：'#document'
    - nodeValue：null
  - ......

**描述这些节点之间关系的属性**

- childNodes：获取所有的子节点
- childern：获取所有的元素子节点
- firstChild：获取第一个子节点
- lastChild：获取最后一个子节点
- firstElementChild / lastElementChild：获取第一个和最后一个元素子节点（不兼容IE6-8）
- priviousSibling：获取上一个哥哥节点
- nextSibling：获取下一个弟弟节点
- priviousElementSibling / nextElementSibling：获取哥哥和弟弟元素节点（不兼容IE6-8）
- ......

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

##### 在JS中动态增加、删除、克隆元素

- createElement：创建元素对象
- createTextNode：创建文本对象
- appendChild：把元素添加到容器的末尾
- insertBefore：把元素添加到指定容器中指定元素的前面

```js
//动态创建一个div元素，把其赋给box
let box = document.createElement('div');
box.id = 'boxActive';
box.style.width = '200px';
box.style.height = '200px';
box.className = 'RED';

//动态创建一个文本
let text = document.createTextNode('哈哈哈哈');

//添加  容器.appendChild
//将text中内容放到box容器的末尾
box.appendChild(text);
//将box元素添加到body容器的末尾
document.body.appendChild(box);

//放到指定元素前：容器.insertBefore([指定元素],[新增元素])
let heihei= document.createTextNode('嘿嘿');
document.body.insertBefore(heihei,box);
```

- cloneNode(true/false)：克隆元素或者节点

> cloneNode(true)：深克隆（克隆了子子孙孙）
>
> cloneNode(false)：浅克隆（只克隆了儿子）

```js
let box1 = document.querySelector(.box);
//克隆第一份（深克隆）
let box2 = box1.cloneNode(true);
//克隆第二份（浅克隆）
let box3 = box1.cloneNode(false);

```

- removeChild：移除容器中的某个元素

```js
//容器.removeChild(元素)
document.body.removeChild(box2);
```

- setAttribute / getAttribute / removeAttribute：设置获取移除元素的自定义属性信息（这种方式是把自定义属性放到元素结构上）

```js
var btnList = document.querySelectorAll('button');
for (var i = 0; i < btnList.length; i++) {
    //设置自定义属性：setAttribute
    btnList[i].setAttribute('myindex', i);
    btnList[i].onclick = function() {
        //获取自定义属性：getAttribute
        alert(this.getAttribute('myindex'));
    }
}
```

##### 获取元素样式和操作样式

> 修改元素样式：
>
> [ELEMENT].style.xxx = xxx;     //修改和设置它的行内样式
>
> [ELEMENT].className = xxx;   //设置样式类
>
> 获取元素的样式：
>
> console.log([ELEMENT].style.xxx);  //获取的是当前元素写在行内上的样式

##### JS盒子模型属性

> 基于一些属性和方法，让我们能够获取到当前元素的样式信息，例如：clientWidth、offsetWidth等
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
>   - top/left
>   - parent
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

