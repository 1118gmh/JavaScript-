### Number数字类型

> 包含：常规数字、NaN

1. NaN：not a number

> NaN不是一个数，但它属于数字类型
> NaN和任何值都不相等（包括自己）：NaN!=NaN，所以我们不能用相等的方式判断是否为有效数字

2. isNaN([val])

> 判断一个数是否为非有效数字，若返回true，则是非游戏哦啊数字：若返回false，则是有效数字；
>
> 注意：在使用isNaN([val])检测时，会先验证是否为数字类型，如果不是，则先通过number()转化为数字类型，再进行检测。

```js
//isNaN([val])
console.log(isNaN(10)); //false
console.log(isNaN('AA')); //true
console.log(isNaN('10')); //false
```

> 10 是数字类型，直接检测，结果false
>
> ‘AA’不是数字类型，先number('AA')=NaN；再isNaN(NaN)，结果true
>
> ‘10’不是数字类型，先number('10')=10；再isNaN(10),结果false

3. 把其他类型值，转换为数字类型

- Number([val])：

  > 它是按照浏览器底层机制，把其他类型转换为数字

```js
//字符串转化成数字
console.log(Number('12.5')); //12.5
console.log(Number('12.5.5')); //NaN
console.log(Number('')); //0
//布尔转换成数字
console.log(Number(true)); //1
console.log(Number(false)); //0
//null和undefined
console.log(Number(null));//0
console.log(Number(undefined));//NaN
//引用转数字：先基于tostring方法转换为字符串，再讲字符串转换为数字
console.log(Number({ name: '10' })); //NaN
console.log(Number([])); //0
console.log(Number([12])); //12
console.log(Number([12, 23])); //NaN
```

> { name: '10' }.toString => "[object object]" => NaN
>
> [].toString => "0" => 0

- parseInt/parseFloat([val],[进制])

> 也是转换为数字的方法，传递的值是字符串，若不是，则先转换为字符串，对于字符串说，它是从左到右依次查找有效数字字符，直到遇到非有效字符，则停止查找。

```js
console.log(parseInt("12.5px"));//12
console.log(parseFloat("12.5px"));//12.5
console.log(parseInt("width:12.5px"));//NaN
console.log(parseInt(''));NaN
```

- ==进行比较的时候，可能会出现把其他类型值转换为数字

**Number原型上的方法**

1. toString

   ```js
   /*
    *toString：将一个数值转为字符串
    *	@params [val] 接收一个参数val，表示先将这个数值转为val进制，再输出字符串。
    *	@return [String]
    */
   (10).toString(); //"10" ，默认转换为10进制
   (10).toString(2); //"1010" 转换为2进制
   
   //注意：括号不能去掉，如果去了，则浏览器会混淆小数点和对象的点运算符，报错
   10.toString(2); //Uncaught SyntaxError: Invalid or unexpected token
   ```

2. toFixed

   ```js
   /*
    *toFixed：将一个数转为指定位数的小数，然后返回这个小数对应的字符串
    *	@params [val]接收一个参数，保留指定为小数
    *	@return [String]
    */
   (10).toFixed(2) // "10.00"
   10.005.toFixed(2) // "10.01"
   ```

3. toExponential

   ```js
   /*
    *toExponential：将一个数转为科学计数法
    *	@params [val]接收一个参数，保留指定为小数（该参数不能超过100，否则报错）
    *	@return [String]
    */
   (10).toExponential()  // "1e+1"
   (10).toExponential(1) // "1.0e+1"
   (10).toExponential(2) // "1.00e+1"
   
   (1234).toExponential()  // "1.234e+3"
   (1234).toExponential(1) // "1.2e+3"
   (1234).toExponential(2) // "1.23e+3"
   ```

4. toPrecision

   ```js
   /*
    *toPrecision：将一个数转为指定位的有效数字
    *	@params [val]接收一个参数，保留位有效数字
    *	@return [String]
    */
   (12.34).toPrecision(1) //"1e+1"
   (12.34).toPrecision(2) //"12"
   (12.34).toPrecision(3) //"12.3"
   (12.34).toPrecision(4) //"12.34"
   (12.34).toPrecision(5) //"12.340"
   ```

5. toLocalString

   ```js
   /*
    *toLocalString：方法接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。
    *	@params 
    *	@return [String]
    */
   (123).toLocaleString('zh-Hans-CN-u-nu-hanidec')
   // "一二三"
   //该方法还可以接受第二个参数配置对象，用来定制指定用途的返回字符串。该对象的style属性指定输出样式，默认值是decimal，表示输出十进制形式。如果值为percent，表示输出百分数。
   (123).toLocaleString('zh-Hans-CN', { style: 'percent' })// "12,300%"
   //如果style属性的值为currency，则可以搭配currency属性，输出指定格式的货币字符串形式。
   (123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY' })// "￥123.00"
   (123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })// "123,00 €"
   (123).toLocaleString('en-US', { style: 'currency', currency: 'USD' })// "$123.00"
   //如果Number.prototype.toLocaleString()省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定。注意，该方法如果使用浏览器不认识的地区码，会抛出一个错误。
   (123).toLocaleString('123') // 出错
   ```

   