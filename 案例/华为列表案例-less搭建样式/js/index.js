/**
 * 1. 获取元素
   获取【list、headerBox、linkAry、productAry】
2. 获取数据和实现数据的动态绑定
3. 点击操作
 */
let list = document.getElementById('list');

let getData = function() {
    let productData = null;

    let productRender = function() {
        "use strict";
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'json/product.json', false);
        xhr.onreadystatechange = function() {
            if (xhr.status === 200 && xhr.readyState === 4) {
                productData = xhr.responseText;
            }
        };
        xhr.send(null);
        productData = utils.toJSON(productData);
    };
    let bindHTML = function() {
        let str = ``;
        for (let i = 0; i < productData.length; i++) {
            let {
                price,
                time,
                hot,
                img = 'img/1.png',
                title
            } = productData[i];
            str +=
                `<li data-price="${price}" data-time="${time}"  data-hot="${hot}">
            <a href="#">
                <img src="${img}" alt="">
                <p title="${title}">${title}</p>
                <span>$${price}</span>
                <span>时间：${time}</span>
                <span>热度：${hot}</span>
            </a>
        </li>`;

        }

        list.innerHTML += str;
    };
    let onClick = function() {
        let headerBox = document.getElementById('px'),
            linkAry = utils.getNexts(headerBox),
            productAry = utils.getEleChildren(list);
        for (let i = 0; i < linkAry.length; i++) {
            linkAry[i].flag = -1;
            linkAry[i].index = i;


            linkAry[i].onclick = function() {
                for (let j = 0; j < linkAry.length; j++) {
                    if (linkAry[j] != this) {
                        linkAry[j].flag = -1;
                    }
                }
                this.flag *= -1;
                sortList.call(this);
            };
        }

        let sortList = function() {
            let aList,
                bList,
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
            let cdf = document.createDocumentFragment();
            for (let i = 0; i < productAry.length; i++) {
                cdf.appendChild(productAry[i]);
            }
            list.appendChild(cdf);
        };
    };
    return {
        init: function() {
            productRender();
            bindHTML();
            onClick();
        }

    }
}();
getData.init();