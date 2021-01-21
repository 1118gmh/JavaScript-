//1. document.getElementById()
//let tabBox = document.getElementById('tabBox');

//2. [context].getElementsByTagName()、[context].getElementsByClassName()
//这两种获取到的是元素集合，想要操作某个元素，需要根据索引取出来才可以使用
// let tabBox = document.getElementsByClassName('tabBox')[0];
// console.log(tabBox);

//3. querySelector获取的是元素对象，哪怕页面中有多个符合，也只获取一个元素对象
//querySelectorAll获取的是元素集合，哪怕页面只有一个符合，获取的也是一个集合
//let tabBox = document.querySelector('.tabBox');
//let tabBox = document.querySelectorAll('.tabBox');
// let navList = tabBox.querySelectorAll('.tab li');
// console.log(navList);

//4. document.getElementsByName()
// var sexList = document.getElementsByName('sex');
// console.log(sexList);
var tabBox = document.getElementById('tabBox');

function childern(context) {
    //1.先获取所有的子节点
    var res = [],
        nodeList = context.childNodes;
    //遍历循环所有的子节点，找出元素子节点（nodeType===1），存储到RES中即可
    for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList[i];
        item.nodeType === 1 ? res.push(item) : null;
    }
    return res;
}