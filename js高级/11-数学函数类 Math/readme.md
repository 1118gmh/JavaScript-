### Math数学函数

```js
console.log(typeof Math); //=>"object"
```

> Math数学函数：它不是一个函数，它是一个对象，由于由于对象中存储了很多操作数字的属性和方法，因此被称为数学函数。

**Math中常用的属性和方法**

1. Math.abs([number value])

> 获取绝对值

```js
console.log(Math.abs(-12)); //=>12
console.log(Math.abs('-1')); //=>1
console.log(Math.abs('-1px')); //=>NaN
```

> 先判断是否是数字类型，若是，则直接获取绝对值；若不是，则先基于Number()转换为数字，再获取绝对值。

2. Math.ceil/floor([number value])

> 把一个数向上取整或向下取整

3. Math.round([number value])

> 四舍五入

```js
//正数.5入，负数.5舍
console.log(Math.round(12.5)); //=>13
console.log(Math.round(-12.5)); //=>-12
```

4. Math.max/min([val1],[val2]...)

> 获取一堆数中的最大值和最小值

```js
console.log(Math.max(1,5,10,6,30,7)); //=>30
console.log(Math.min(1,5,10,6,30,7)); //=>1
console.log(Math.max([1,5,10,6,30,7])); //=>NaN
```

5. Math.sqrt/pow([val])

> sqrt：给一个数开平方
>
> pow：计算一个数的多少次幂

```js
console.log(Math.sqrt(9)); //=>3
console.log(Math.pow(2,10)); //=>1024
```

6. Math.random()

> 获取0-1之间的随机小数
>
> 扩展：获取[n-m]之间的随机整数（n>m，包括n、m）
>
> Math.round(Math.random()*(m-n)+n);
>
> 例：获取1-10之间的随机整数
>
> console.log(Math.round(Math.random()*9+1));