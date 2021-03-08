let list = document.getElementById('list');


~ function() {
    "use strict";
    /**
     * 1. 获取数据和实现数据绑定
     *    =>真实项目中，页面都不是写死的，都是动态绑定的
     *    A:从服务器端获取到数据（基于AJAX 、 JSONP等技术通过服务器端提供的数据API接口地址，把数据请求回来）
     *    B:把获取的数据进行解析
     *    C:把数据绑定在HTML页面中（数据绑定）
     */
    //A. 获取数据
    let productData = null;
    let xhr = new XMLHttpRequest(); //创建AJAX实例
    xhr.open('GET', 'json/product.json', false); // 打开一个请求的地址（一般都是服务器提供好的，会给我们一个API接口文档），最后一个参数是设置同步还是异步
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            productData = xhr.responseText;
        }
    };
    xhr.send(null);
    //B. 数据解析（获取到的数据是一个JSON格式字符串，我们需要将它转换为对象）
    productData = utils.toJSON(productData);
    //C. 数据绑定:依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的页面和结构放到页面的指定容器中。
    /**
     * 1. 动态创建DOM（已经pass掉了）
     * =>document.createElement();
     * =>[ele].appendChild();
     * 
     * 2. 字符串拼接
     * =>传统字符串拼接
     * =>ES6模板字符串拼接 *
     * =>模板引擎
     *  
     */
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            hot,
            title,
            img = 'images/huawei mate 30 pro.png',
            price,
            time
        } = productData[i];
        //给li添加自定义属性，以便以后获取价格使用,定义在结构上，后面只能基于getattribute()方法获取
        str += `<li data-price="${price}" data-time="${time}"  data-hot="${hot}">
    <a href="#">
        <img src="${img}" alt="no">
        <h4>${title}</h4>
        <p>
            ${price}
        </p>
    </a>
</li>`
    }
    list.innerHTML = str;
}();
~ function() {
    "use strict";
    let headerBox = document.getElementById('px'),
        linkAry = utils.getNexts(headerBox),
        productAry = utils.getEleChildren(list);


    //循环绑定事件
    for (var i = 0; i < linkAry.length; i++) {
        linkAry[i].flag = -1;
        linkAry[i].index = i;
        linkAry[i].addEventListener("click", function() {
            //每次点击让除了当前元素的其他的flag回归初始状态-1
            for (let j = 0; j < linkAry.length; j++) {
                if (linkAry[j] !== this) {
                    linkAry[j].flag = -1;
                }
            }
            this.flag *= -1;
            //改变this指向
            sortList.call(this);

        });
    }

    //实现排序
    let sortList = function() {

        //使用普通函数：this：当前操作的A
        //使用箭头函数：this：window
        //升序
        //在sort传参中，如果回调函数是普通函数，回调函数中的this是window
        //在sort传参中，如果回调函数时箭头函数，回调函数中的this是就是上下文中的this也就是当前操作的A
        //总结：箭头函数要慎用，箭头函数中无this，它里面的this是上下文的this
        productAry.sort((a, b) => {
            let aList,
                bList;
            let ary = ["data-time", "data-price", "data-hot"];
            aList = a.getAttribute(ary[this.index]);
            bList = b.getAttribute(ary[this.index]);
            if (this.index === 0) {
                aList = aList.replace(/-/g, '');
                bList = bList.replace(/-/g, '');
            }
            return (aList - bList) * this.flag;
        });
        let frg = document.createDocumentFragment();
        //按照排好序的数组重新添加到页面中
        for (let i = 0; i < productAry.length; i++) {
            //回流次数多
            //let curLi = productAry[i];
            //list.appendChild(curLi);
            //基于文档碎片减少DOM回流：都添加到文档碎片中，这样只回流一次
            frg.appendChild(productAry[i]);
        }
        list.appendChild(frg);
        frg = null
    };

}();