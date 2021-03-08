### js的四种异步编程方式

1. 回调函数

> 回调函数：把一个函数当做实参传递给另外一个函数B，在B方法执行的时候，把A执行了，我们把这种机制叫做“回调函数机制”

```js
let fn = (callback) =>{
  	//=>callback：传递进来的函数
    callback && callback.call(obj,100,200);//callback存在，就执行；不存在就不执行
};
fn((n,m)=>{
    //回调函数中this一般都是window，除非在宿主函数中改变了this指向（箭头函数中的this是它的上下文的，拿call该也没用）
    console.log(n,m);
    return n+m;
});
```

> callback的作用：
>
> - 根据需求可以执行callback函数N次
> - 可以在宿主函数中给回调函数传递实参，这样在回调函数通过设置新参接受即可
> - 可以在宿主函数中改变回调函数this指向
> - 可以在宿主函数中接受回调函数return的结果
> - ......

```js
//例：
//封装一个each方法：可以遍历数组、类数组、对象,并且绑定this为当前对象,并且当返回值为false时，结束遍历。
let each = function(obj, callback) {
    //=>验证是数组（类数组）还是对象
    let flag = 'length' in obj;
    if (flag) {
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            let result = callback && callback.call(item, i, item);
            if (result === false) break;
        }
    } else {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let value = obj[key];
                let result = callback && callback.call(value, key, value);
                if (result === false) break;
            }
        }
    }
};
each([1, 23, 32], function(index, item) {
    //this:item
    console.log(index, item, this);
    if (index >= 1) {
        return false;
    }
});
each({ name: 'xiaoming', age: 12 }, function(key, value) {
    console.log(key, value, this);
    if (value === "xiaoming") {
        return false;
    }
});
/**
 * 0 1 [Number: 1]
 * 1 23 [Number: 23]
 * name xiaoming [String: 'xiaoming']
 */
```

```js
//myReplace
String.prototype.myReplace = function(reg, callback) {
    //this:str
    //默认：reg加了g
    let res = reg.exec(this),
        _this = this;
    while (res) {
        //res：捕获的结果
        //捕获一次，执行一次回调函数，并且将获取的结果当参数传递给回调函数
        let value = callback && callback(...res);
        let v = res[0],
            i = _this.indexOf(v);
        console.log(v, i);
        _this = _this.substring(0, i) + value + _this.substring(v.length + i);
        res = reg.exec(this);
    }
    return _this;
};
let str = 'my name is {0} ,i am {1} years old',
    ary = ['xiaoming', '22'];
str = str.myReplace(/\{(\d+)\}/g, function(...arg) {
    let index = arg[1];
    return ary[index];
});
console.log(str);
//my name is xiaoming ,i am 22 years old
```





2. 事件监听

3. 发布订阅

4. Promises对象

> Promise：它是ES6中新增加的类（new Promise），目的是为了管理JS的异步编程的，所以我们称之为“Promise设计模式”
>
> Promise有3个状态
>
> - resolve 成功
>
> - reject 失败
>
> - pending等待态

```js
//let p = new Promise();
//p.then();
new Promise(()=>{
    //=>执行一个异步的任务(new Promise的时候，创建Promise的一个实例，立即执行当前函数体中的异步操作)
    //=>Promise是同步的，但是它可以管理异步操作
    setTimeout(()=>{
        
    },1000);//执行了一个异步操作，在任务队列的1s处放置了一个异步任务
    
}).then();
```

> new Promise()可以创建Promise的一个实例，可以传递一个函数，可以立即执行当前函数体中的异步操作
>
> Promise是同步的，但是它可以管理异步操作，可以解决异步的问题

```js
new Promise((resolve,reject)=>{
    //=>resolve：当异步操作执行成功，我们执行resolve方法
    //=>reject：当异步操作执行失败，我们执行reject方法
    setTimeout(()=>{
        resolve(100);
    },1000);
}).then(()=>{
    //resolve函数执行
    console.log('ok');
},()=>{
    //reject函数执行
    console.log('no');
});
```

例如：

> AJAX异步方式存在的问题

```js
let result = null;
let xhr = new XMLHttpRequest();
xhr.open('get','test.js',true);//使用异步的方式获取
xhr.onreadystatechange = ()=>{
    if(xhr.readyState === 4 && xhr.status === 200){
        result = xhr.responseText;
        //=>这里获取到数据，应当在这里对数据进行处理（完成数据绑定等任务），这样做非常bad，
        //=>因此可以使用Promise的方式管理异步操作
    }
};
xhr.send(null);
console.log(result);//由于使用异步的方式，不等AJAX彻底完成，就把result输出，此时的结为null
```

> AJAX异步方式通过Promise解决

```js
let result = null;
new Promise((resolve, reject) => {
    //执行一个异步操作
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'test.js', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result = xhr.responseText;
            resolve(result);
        }
        if(xhr.status !== 200){
            reject();
        }
    };
    xhr.send(null);
}).then(res=>{
    console.log(res);
	//获取到数据后，对数据处理的代码写在这里（比如说这里绑定HTML页面）
    
    return 100;//返回的结果传递给第二个then的参数
},()=>{
    //获取数据失败后，执行的代码
}).then(res=>{
    //当第一个then中函数执行完成后，会执行第二个then（比如说这里在绑定完页面结构后，执行滚动到底部的数据加载）
}).then(()=>{
    //当第二个then中函数执行完成后，会执行第三个then（...）
});
```

