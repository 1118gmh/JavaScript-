### 基于AJAX获取数据和实现数据绑定

> 在实际开发中，我们制作的页面中的数据都不是写死的，而是要通过服务器端提供的API接口地址，把数据请求过来，解析之后（获取到的数据一般都是JSON格式字符串，我们需要通过JSON提供的parse这个API接口进行解析，解析成对象，当然这里得考虑兼容），把数据绑定在HTMl页面中

简单来说，分为三步骤

- 获取数据
- 数据解析
- 数据绑定

```js
//例:
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
productData = JSON.parse(productData);

//C. 数据绑定:依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的页面和结构放到页面的指定容器中。
/**
 * 1. 动态创建DOM（已经pass掉了,因为会导致多次回流，性能不好，而且操作不方便）
 * =>document.createElement();
 * =>[ele].appendChild();
 * 
 * 2. 字符串拼接
 * =>传统字符串拼接
 * =>ES6模板字符串拼接 *
 * =>模板引擎
 *  
 */
let list = document.getElementById('list');
let str = ``;
for (let i = 0; i < productData.length; i++) {
    let {
        title,
        img = 'images/huawei mate 30 pro.png',
        price
    } = productData[i];
    str += `<li>
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
```



