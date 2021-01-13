### 日期对象

- new Date()：获取本机时间

```js
let time = new Date(); //=>Wed Sep 02 2020 17:01:11 GMT+0800 (中国标准时间)
```

> 获取当前客户端（本机电脑）本地的时间，这个时间用户可以自己修改，所以不能作为重要参考依据。
>
> Wed Sep 02 2020 17:01:11 GMT+0800 (中国标准时间)
>
> 获取的结果是对象数据类型，属于日期对象（或者说是Date这个类的实例对象）

- new Date([时间格式字符串])：把一个时间格式字符串转换为标准的时间格式

```js
new Date("2019/7/26");
//=>Fri Jul 26 2019 00:00:00 GMT+0800 (中国标准时间)
```

> 支持的格式：
>
> ​	yyyy/mm/dd
>
> ​	yyyy/mm/dd hh:mm:ss
>
> ​	yyyy-mm-dd 这种格式IE不支持

**常用的方法**

- getFullYear()   获取年
- getMonth()   获取月(0-11)
- getDate()   获取日
- getDay()   获取星期
- getHours()   获取时
- getMinutes()   获取分
- getSeconds()   获取秒
- getMilliseconds()   获取毫秒
- getTime()   获取当前时间距离1970/1/1 00:00:00的毫秒差，和valueOf()方法等价
- toLocaleDateString()   获取年月日（字符串）
- toLocaleString()   获取完整的日期字符串

> 其中get对应的有set；比如有getMinutes就有setMinutes；如果传入的值超过59就会增加小时数

> getYear()和getFullYear()：getFullYear是当前的年份，getYear是当前"年份-1900"的值；

- getUTCMinutes()  获取UTC日期中的分钟数
- getTimezoneOffset()  返回本地时间与UTC时间相差的分钟数

**计算程序的耗时**

> **Date.now()**方法：返回调用这个方法时的日期和时间的毫秒数。（这个方法简化了使用Date对象分析代码的工作）

```js
var start = Date.now();
for(var i = 0;i < 1000000;i++){
    
}
var end = Date.now();
console.log(end-start);//6
```

> 也可以使用time方法计算程序的耗时：

```js
console.time("time");
for(var i = 0;i < 1000000;i++){
    
}
console.timeEnd("time");//time: 5.219970703125 ms
```

**日期的比较**

> 原理：计算出距离1970年的毫秒数再比较。

```js
var time1 = new Date("2020/11/5");
var time2 = new Date("2020/11/4");
console.log(time1.getTime());//1604505600000
console.log(time2.getTime());//1604419200000
console.log(time1.getTime()-time2.getTime());//86400000
```



**时钟案例**

```js
let clockBox = document.getElementById('clockBox');
/* 
    *addZero：不足2位的数字或字符串在前面补零
    *@params
    *   val
    *@return
    *   [String]
    *by gaominghui on 2020/09/02
    */
function addZero(val) {
    let n = val + '';
    return n.length < 2 ? '0' + n : n;
}
/* 
    *queryDate：获取当前日期，把其转换为想要的格式
    *@params
    *@return
    *by gaominghui on 2020/09/02         
    */
function queryDate() {
    let time = new Date();
    //1.获取当前日期及详细内容
    let year = time.getFullYear(),
        month = time.getMonth() + 1;
    day = time.getDate();
    week = time.getDay();
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
    //2.拼接成字符串
    let result = year + '年' + addZero(month) + '月' + addZero(day) + '日' + ' ';
    let weekAry = ['日', '一', '二', '三', '四', '五', '六'];
    result = result + '星期' + weekAry[week] + ' ';
    result += hours + '：' + minutes + ':' + seconds;
    //3.把字符串传到盒子里
    clockBox.innerHTML = result;
}
queryDate();
//设置一个setInterval定时器：每隔一千毫秒，执行一次queryDate方法
setInterval(queryDate, 1000);
```

