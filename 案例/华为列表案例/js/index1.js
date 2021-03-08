let list = document.getElementById("list");
~ function() {
    "use strict";
    let productData = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/product.json', false);
    //忘了
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            productData = xhr.responseText;
        }
    };
    xhr.send(null);
    productData = utils.toJSON(productData);
    let str = ``;

    for (let i = 0; i < productData.length; i++) {
        //2.productData是对象，解构赋值时左边应该也是对象
        //peoductData漏了一个i；productData[i]表示一个小li的数据量
        let {
            price,
            time,
            hot,
            img = 'images/huawei mate 30 pro.png',
            title
        } = productData[i];
        str += `<li data-price="${price}" data-time="${time}"  data-hot="${hot}">
         <a href="#">
             <img src="${img}" alt="no">
             <h4>${title}</h4>
             <p>
                 ${price}
             </p>
         </a>
     </li>`;

    }
    list.innerHTML = str;
}();
~ function() {
    "use strict";
    let headerBox = document.getElementById('px'),
        linkAry = utils.getNexts(headerBox),
        productAry = utils.getEleChildren(list);
    for (let i = 0; i < linkAry.length; i++) {
        linkAry[i].flag = -1;
        linkAry[i].index = i;
        linkAry[i].onclick = function() {
            for (let j = 0; j < linkAry.length; j++) {
                if (linkAry[j] !== this) {
                    linkAry[j].flag = -1;
                }
            }
            linkAry[i].flag *= -1;
            sortList.call(this);
        };
    }
    let sortList = function() {
        productAry.sort((a, b) => {
            let ary = ['data-time', 'data-price', 'data-hot'];
            let aList = a.getAttribute(ary[this.index]);
            let bList = b.getAttribute(ary[this.index]);
            if (this.index === 0) {
                aList = aList.replace(/-/g, '');
                bList = bList.replace(/-/g, '');
            }

            return (aList - bList) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            list.appendChild(productAry[i]);
        }

    }
}();