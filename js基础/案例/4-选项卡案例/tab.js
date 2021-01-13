// 获取对象
var tabBox = document.getElementById('tabBox');
var tabList = tabBox.getElementsByTagName('div');
var navBox = document.getElementById('navBox');
var navList = navBox.getElementsByTagName('li');
//循环给每个li都绑定点击事件
for (var i = 0; i < navList.length; i++) {
    navList[i].myIndex = i;

    navList[i].onclick = function() {
        //this.myIndex就是当前点击的对象获取其之前绑定的自定义对象
        changeTab(this.myIndex);
    }
}

//封装函数
function changeTab(clickIndex) {
    //让所有的li和div都没有选中样式
    for (var i = 0; i < navList.length; i++) {
        navList[i].className = '';
        tabList[i].className = '';
    }
    navList[clickIndex].className = 'active';
    tabList[clickIndex].className = 'active';
}
/*
遇到的问题：
只有js代码执行完成后，用户才能看到页面，
但在执行js代码时，循环执行完成后，i已经变成3了
用户点击li标签，执行点击事件绑定的方法，i此时为3，出现错误
*/
/*
解决办法1：自定义属性
在循环绑定事件的时候，给每一个li设置一个自定义属性，属性值存的是当前li的索引
navList[i].myIndex = i;

for (var i = 0; i < navList.length; i++) {
    navList[i].myIndex = i;

    navList[i].onclick = function() {
        //this.myIndex就是当前点击的对象获取其之前绑定的自定义对象
        changeTab(this.myIndex);
    }
}

解决方法2：闭包解决方案
for (var i = 0; i < navList.length; i++) {
    navList[i].onclick = (function(i){
        return function() {
            changeTab(i);
        }
    })(i)
}

解决方案3：var改成let
*/