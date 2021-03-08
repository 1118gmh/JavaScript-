let productRender = function() {
    "use strict";
    let list = document.getElementById('list');
    let productData = null;
    //获取数据
    let getData = function() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'json/product.json', false);
        //忘了
        xhr.onreadystatechange = function() {
            if (xhr.status === 200 && xhr.readyState === 4) {
                productData = xhr.responseText;
            }
        };
        xhr.send(null);
        productData = utils.toJSON(productData);
    };
    //数据绑定
    let bindHTML = function() {
        let str = ``;
        productData.forEach(({
            price,
            time,
            hot,
            img = 'img/1.png',
            title
        }) => {
            str += `<li data-price="${price}" data-time="${time}"  data-hot="${hot}">
            <a href="#">
                <img src="${img}" alt="">
                <p title="${title}">${title}</p>
                <span>$${price}</span>
                <span>时间：${time}</span>
                <span>热度：${hot}</span>
            </a>
            </li>`;
        });
        list.innerHTML += str;
    };
    /**不能再此处声明productAry，因为代码是先获取元素，在此时list元素是空的
     * 只有在bindHTMl方法执行后，更具DOM映射机制，list中才会有元素，所以productAry获取应该在bindHTML执行后才可以
        let productAry = utils.getEleChildren(list);  //[]
       如果想要写在onClick外部也可以，但是得通过getElementsByClassName、getElementById等方法，因为这些方法存在DOM映射机制 
        DOM映射机制：在数据绑定前获取的集合为空，在数据绑定后，自动映射到集合中
       */
    //事件点击
    let onClick = function() {
        let headerBox = document.getElementById('px');
        let linkAry = utils.getNexts(headerBox);
        let productAry = utils.getEleChildren(list);
        linkAry.forEach((item, index) => {
            item.flag = -1;
            item.index = index;
            item.onclick = function() {
                for (let i = 0; i < linkAry.length; i++) {
                    if (item !== this) {
                        linkAry[i].flag = -1;
                    }
                }
                item.flag *= -1;
                sortList.call(this);
            };
        });
        let sortList = function() {
            let aList = null,
                bList = null,
                ary = ['data-time', 'data-price', 'data-hot'];
            productAry.sort((a, b) => {
                aList = a.getAttribute(ary[this.index]);
                bList = b.getAttribute(ary[this.index]);
                if (typeof aList === 'string') {
                    aList = aList.replace(/-/g, '');
                    bList = bList.replace(/-/g, '');

                }
                return (aList - bList) * this.flag;
            });
            console.log(productAry);
            let fra = document.createDocumentFragment();
            for (let i = 0; i < productAry.length; i++) {
                fra.appendChild(productAry[i]);

            }
            list.appendChild(fra);
        };
    };
    return {
        init: function() {
            getData();
            bindHTML();
            onClick();
        }
    }
}();
productRender.init();