这次封的DOM思路和以前一样，封在Tool.prototype上的；在tool里装了一个属性；

this.flag = “getElementsByClassName” in document;

这个在IE678是不兼容的；如果这个是true说明是标准浏览器；如果是false，说明是IE大爷；

下面是封装的风格；

> ```
> var Tool = function () {//构造函数模式；用的时候需要new一下；    this.flag = "getElementsByClassName" in document;    //getElementsByClassName 在IE678中是不存在的。用这个来判断是不是低版本的IE浏览器；    //每次只需要判断this.flag是否存在就可以了；如果存在就是标准浏览器，如果不存在就是IE；};Tool.prototype = {//方法是定义在Tool的prototype上的；    constructor: Tool,//重写prototype后，prototype的constructor已经不是原来的Tool了；需要手动给他强制写会到Tool上去；    getIndex: function () {},//简单的备注说明；    toJSON:function(){},//简单的备注说明；    likeArray:function(){}//简单的备注说明；}
> ```

```
封装的函数兼容到IE6；
```

受jQuery的链式写法的启发，我用了函数调用的封装好的方法；好比获取上一个哥哥节点是getPre;当封装所有哥哥们的时候，就借用封号好的getPre；DOM库内的getPres之类的封装就是这种思想封的；

在作用域套作用域的时候；子作用域内尽量不返回引用数据类型，因为闭包内的值，是另外一个子闭包的返回值的时候，如果子闭包的返回值是字面量，那么浏览器会在空闲的时候，把作用域销毁；而如果返回值的是一个引用数据类型的值，那么闭包是不会销毁的，在性能优化上，不好！

1、如何调用

tool.js 使用的是构造函数模式开发的类库，使用的时候需要创建一个实例，例如: > var t=new Tool; t.getElementsByClassName(“context”,“className”);

2、提供了那些的方法

(1)getElementsByClassName

作用：在指定的上下文中根据元素的类名(class样式名)获取对应的元素,旨在解决getElementsByClassName在IE6~8下不兼容；

参数：[className] 样式名称–>“string”；

[context] 上下文

返回值：我们获取的元素集合–>“Array”

(2)setGroupCss

> t.setGroupCss(oDiv,{left:100, top:20,opacity:0.3});

## 封装的方法预览

- getElementsByClassName ：处理低版本IE的兼容性问题；
- toJSON ：JSON格式的字符串转成JSON对象；
- isType ：判断数据类型
- listToArray ：类数组转为数组；（arguments）
- **下面是设置DOM的方法**
- getEleChildren ：获取元素下面的指定的标签名的元素集合；
- getFirst ：第一个元素节点
- getLast ：最后一个元素节点
- getPre ：相邻哥哥的元素节点
- getPres：相邻哥哥们的元素节点
- getNext：相邻弟弟的元素节点
- getNexts：相邻弟弟们的元素节点
- getSibling：上一个哥哥和下一个弟弟
- getSiblings：所有的兄弟们（除了自己）
- getIndex：获取索引值
- insertAfter：在指定目标元素oldEle后面插入新元素newEle；如果没有传指定元素，则直接添加在后面；这个方法好像没啥实际意义；可以通过insertBefore变相实现；
- prependChild ：把一个元素节点添加为parentEle的第一个子节点；
- innerHTML ：获取元素的innerHTML；
- text ：获取和设置innerHTML；
- **下面是设置CSS**
- setCss ：设置CSS属性值和获取CSS；如果三个参数就是设置，2个参数就是获取；
- setGroupCss：给元素设置一组属性；cssObj是一个对象类型；
- offset ：//获取偏移量；
- hasClassName：判断是否有某个className；
- addClassName ：增加某个className；
- removeClassName ：移除类样式的方法；
- **在DOM库上增加方法，同时不影响原来的方法；在类的原型上增加方法；**
- aryPro.removeRepeat ：数组去重；
- aryPro.forEachPro ：forEach兼容性处理；
- objPro.myHasPubProperty ：是否为公有属性；
- strPro.myTrim ：去除首尾空格；
- strPro.mySub ：是不是有效的
- strPro.myFormatTime ：时间格式化；
- strPro.myQueryURLParameter ：是否是有效URL
- 

3、扩展(不修改原有的类但是可以使用原有类的方法)

## 自定义类实现继承我们的Tool类：

例如：

1)原型链继承

- var Fn=function(){};
- Fn.prototype=new Tool;
- var f=new Fn;

f就可以调用我们的Tool上面的方法了；因为f是Fn的一个实例了，而且f会通过；f.**proto**也就是Fn.prototype；找到Tools的函数； 扩展的时候，也可以在f上直接f.XXX来扩展；