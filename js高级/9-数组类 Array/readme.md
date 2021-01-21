### 数组

> 数组是特殊的对象
>
> 1. 我们中括号中设置的是属性值，它的属性名是默认生成的数字，从零开始递增，而且这个数字代表每一项的位置，我们称其为“索引”=>**从零开始，连续递增，代表每一项位置的属性名。**
> 2. 数组默认有个属性名length，存储数组的长度

**数组的定义**

```js
//=>1. 构造函数模式
var colors = new Array("red","blue","green");
//=>2. 字面量表示法
var colors = ["red","blue","green"];
```

**length小技巧**

```js
let ary = [12,'哈哈',true,13];

//通过length向末尾追加内容
ary[ary.length] = 100;
console.log(ary); //=>[12,'哈哈',true,13,100]

//通过length删除n项
ary[n] = ary[ary.length-1];
ary.length = ary.length-1;
```

**数组中常用的方法**

> - 方法的作用和含义
> - 方法的实参（类型和含义）
> - 方法的返回值
> - 原来的数组是否会发生改变

1. 实现数组增删改的方法

   > 这部分方法会修改原有的数组

- push

  > push：向数组末尾增加内容
  >
  > @params	多个任意类型
  >
  > @return	新增后数组的长度

  ```js
  let ary = [10,20];
  let res = ary.push(30,'AA');
  console.log(res,ary); //=>4 [10, 20, 30, "AA"]
  //等同于用原生js方法向末尾增加内容
  ary[ary.length] = 40;
  ```

- unshift

  > unshift：向数组开始位置增加内容
  >
  > @params	多个任意类型
  >
  > @return	新增后数组的长度

  ```js
  let ary = [10,20];
  let res = ary.unshift(30,'AA');
  console.log(res,ary); //=>4 [30, "AA", 10, 20]
  ```

- shift

  > shift：删除数组中的第一项
  >
  > @params	
  >
  > @return	删除的那一项

  ```js
  let ary = [10,20,30];
  let res = ary.shift();
  console.log(res,ary); //=>10 [20, 30]
  ```

- pop

  > pop：删除数组中的最后一项
  >
  > @params	
  >
  > @return	删除的那一项

  ```js
  let ary = [10,20,30];
  let res = ary.pop();
  console.log(res,ary); //=> 30 [10, 20]
  //基于原生js让数组长度干掉一位,默认干掉最后一位
  ary.length--;
  console.log(ary);
  ```

- splice

  > splice：实现数组的增加、删除、修改
  >
  > @params	
  >
  > ​		删除：n，m都是数字	从索引n开始删除m个元素（若m不写，删除到末尾）
  >
  > ​		修改：n，m，x	从索引n开始删除m个元素，用x占用删除的部分
  >
  > ​		增加：n，0，x	从索引n开始，一个都不删，把x放到索引n的前面
  >
  > @return	把删除的部分用新数组存储起来返回

  - 删除

    ```js
    let ary = [10,20,30,40,50,60,70,80,90];
    let res = ary.splice(2,4);
    console.log(res,ary); //=>[30, 40, 50, 60] [10, 20, 70, 80, 90]
    //删除数组最后一项和第一项
    ary.splice(ary.length - 1); //删除最后一项
    ary.splice(0,1); //删除第一项
    console.log(ary); //=> [20, 70, 80]
    //数组的清空
    res = ary.splice(0);
    console.log(res,ary); //=>[20, 70, 80] []
    ```

    + 增加/修改

    ```js
    let ary = [10,20,30,40];
    let res = ary.splice(1,2,'哈哈');
    console.log(res,ary); //=>[20, 30] [10, "哈哈", 40]
    ary.splice(2,0,'呵呵');
    console.log(ary); //=>[10, "哈哈", "呵呵", 40]
    //向数组末尾追加
    ary.splice(ary.length,0,'嘿嘿');
    console.log(ary); //=>[10, "哈哈", "呵呵", 40, "嘿嘿"]
    ```


2. 查询的方法

   > 这部分方法不会修改原数组

- slice

  > slice：实现数组的查询
  >
  > @params	n，m都是数字	从索引n开始，找到索引为m的地方（不包含m这一项）若m不写，则找到末尾
  >
  > return	把找到的内容以一个新数组的形式返回

  ```js
  let ary = [10,20,30];
  let res = ary.slice(1,3); 
  console.log(res); //=>[20,30]
  //数组的克隆，参数0不写也可以（这种是浅克隆）
  res = ary.slice(0);
  console.log(res); //=>[10,20,30]
  ```

  > 知识扩展：
  >
  > - 浅克隆：直接将存储在栈中的值赋值给对应变量，如果是基本数据类型，则直接赋对应的值，如果是引用数据类型，则赋值的是地址（克隆的数据地址与原数据相同）。
  > - 深克隆：将数据赋值给对应变量，从而产生就一个与原数据不相干的新数据（克隆的数据地址与原数据不相同）。

- concat

  > concat：实现数组拼接
  >
  > @params	对个任意类型值
  >
  > @return	拼接后的新数组（原数组不变）

  ```js
  let ary1 = [10,20,30];
  let ary2 = [40,50];
  let res = ary1.concat('嘿嘿',ary2); 
  console.log(res); //=> [10, 20, 30, "嘿嘿", 40, 50]
  ```

- includes

  > includes:判断一个数组是否包含一个指定的值
  >
  > @params	多个任意类型值
  >
  > @return	[boolean]

  ```js
  let b = [1,2,3].includes(2);
  console.log(b);//=>true
  ```

  

3. 把数组转换为字符串

   > 原数组不变

- toString

  > toString：把数组转换为字符串
  >
  > @params
  >
  > @return	转换后的字符串

  ```js
  let ary = [10,20,30];
  console.log(ary.toString()); //=>"10,20,30"
  ```

- join

  > join：把数组转换为字符串
  >
  > @params	指定的分隔符（字符串形式）
  >
  > @return	转换后的字符串（原来数组不变）

  ```js
  let ary = [10,20,30];
  let res = ary.join(' ');
  console.log(res); //=>"10 20 30"
  console.log(ary.join('+')); //=>"10+20+30"
  
  //扩展：eval():把一个字符串转换成js表达式执行,返回结果
  console.log(eval(ary.join('+')));//=>60
  ```

4. 检测数组中是否包含某一项

   > 原数组不变

- indexOf / lastIndexOf

  > indexOf：检测当前项在数组中第一次或者最后一次出现的位置的索引值（在IE6-8中不兼容）
  >
  > @params	要检索的内容
  >
  > @return	这一项出现的位置索引值（数字）（如果数组中没有这一项，返回的结果为-1）

  ```js
  let ary = [10,20,30,20,10];
  console.log(ary.indexOf(20)); //=>1
  console.log(ary.lastIndexOf(20)); //=>3
  
  //判断是否包含30
  if(ary.indexOf(30) === -1){
  	console.log('不包含');
  }else{
  	console.log('包含');
  }
  //ES6中新提供的includes方法判断
  if(ary.includes(30)){
  	console.log('包含');
  }else{
  	console.log('不包含');
  }
  ```

  ```js
  //注意，这两个方法不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。
  [NaN].indexOf(NaN) // -1
  [NaN].lastIndexOf(NaN) // -1
  //这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。
  ```

5. 数组的排序或者排列

- reverse

  > reverse：把数组倒过来排列
  >
  > @params
  >
  > @return	排列后的新数组
  >
  > 原数组改变

  ```js
  let ary = [10,20,5,15,30];
  ary.reverse();
  console.log(ary); //=>[30, 15, 5, 20, 10]
  ```

- sort

  > sort：实现数组的排序
  >
  > @params	可以没有，也可以是个函数（若不传参数，则无法处理10以上的数字排序，默认按照每一项的第一项字符来排序）；若想实现排序，需要给sort传递一个函数，函数中返回a-b实现升序，返回b-a实现降序
  >
  > @return	排序后的数组
  >
  > 原数组改变

  ```js
  let ary = [10,20,5,15,30];
  //由小到大
  ary.sort((a,b)=>a-b);
  //由大到小
  //ary.sort((a,b)=>b-a);
  console.log(ary);
  ```

  > 上面代码中，`sort`的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于`0`，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

6. 遍历数组中每一项的方法

- forEach

  > forEach：遍历数组中的每一项内容
  >
  > @params	回调函数
  >
  > @return 不返回值
  >
  > 原数组不变

  > 特点
  >
  > - forEach用法与map一致，参数是个函数，该函数接收三个参数：当前值，当前位置，整个数组
  > - forEach遍历不是为了得到返回值，而是为了操作数据
  > - forEach可以接收第二个参数，该参数可以用来绑定函数的this变量。
  > - forEach执行无法break中断，如果希望中断，则使用for循环
  > - forEach会跳过数组的空位，但不会跳过null，undefined

  ```js
  let ary = [10,20,30,40];
  ary.forEach((item,index) => {
  	//数组中有多少项，函数就会被默认执行多少次
  	//每一次执行函数，item是数组中当前操作的这一项，index是当前项的索引
  	console.log('索引：'+index+'内容：'+item);
  });
  
  //基于原生js遍历数组
  for(let i = 0;i < ary.length;i++){
  		console.log('索引：'+i+'内容：'+ary[i]);
  }
  //结果：
  索引：0内容：10
  索引：1内容：20
  索引：2内容：30
  索引：3内容：40
  
  Array.prototype.forEach = function(fn){
      for(let i = 0;i < this.length;i++){
      	fn(this[i],i);
      }
  };
  let ary = [10,20,30,40];
  ary.forEach((item,index) => {
  	console.log(index,item);
  });
  /*0 10
    1 20
    2 30
    3 40*/
  ```

  

- map

  > map：遍历数组并且返回一个新数组，原数组不变
  >
  > @params	2个参数，第一个参数接收一个函数，该函数调用时，map方法向它传入三个参数：当前成员，当前位置，数组本身。第二个参数用来绑定回调函数中的this变量
  >
  > @return  [ARRAY]返回一个新数组
  >
  > 原数组不变

  ```js
  Array.prototype.map = function(fn){
      let ary = [];
      for(let i = 0;i<this.length;i++){
          ary.push(fn(this[i],i));
      }
      return ary;
  }
  let ary = [1,2,3].map(item=>item*2);
  console.log(ary);//=>[2, 4, 6]
  
  ```

- filter

  > filter:过滤出满足条件的元素，返回一个新数组
  >
  > @params	2个参数，第一个参数是回调函数（所有数组成员依次执行该函数，返回结果为true的成员组成一个新的数组返回）；第二个参数用来绑定函数内部的this
  >
  > @return  [ARRAY]返回一个新数组
  >
  > 原数组不变

  ```js
  let ary = [1,2,3].filter(item=>item>=2);
  console.log(ary);//=>[2, 3]
  ```

- find

  > find:查找满足条件的第一个元素的值
  >
  > @params	回调函数
  >
  > @return  
  >
  > 原数组不变

  ```js
  let found = [1,2,3].find(item=>item>1);
  console.log(found);//=>2
  ```

- reduce

  > reduce：从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。
  >
  > @params	第一个参数是回调函数（四个参数：累计变量（默认第一个成员）、当前变量（默认第二个成员）、当前位置（从0开始）、原数组）；第二个参数是设置初始值
  >
  > @return 返回的结果是叠加后的结果
  >
  > 函数的返回结果会作为下一次循环的prev
  >
  > 原数组不变

  ```js
  let res = [1,2,3,4,5].reduce((prev,next,currIndex,ary)=>{
      if(currIndex === ary.length -1){
          return (prev + next)/ary.length;
      }
      return prev + next;
  });
  console.log(res);
  //自己写的myReduce
  Array.prototype.myReduce = function(fn,prev){
      for(let i = 0;i <this.length;i++){
          if(typeof prev ==='undefined'){
             prev = fn(this[i],this[i+1],i+1,this);
              ++i;
             }else{
              prev = fn(prev,this[i],i,this);
          }
      }
      return prev;
  }
  let total = [1,2,3].myReduce((prev,next,currTndex,ary)=>{
      return prev + next;
  },5);
  console.log(total); //=>11
  ```

  ```js
  var a = [1,2,3,4,5].reduce((prev,next)=>{
      return prev + next;
  },10);
  console.log(a);//25   
  ```

  

- some

  > some：查找是否至少有一个满足条件
  >
  > @params	回调函数（三个参数：当前成员、当前位置、整个数组，返回布尔值，如果回调函数有一个返回了true，则some返回true）；第二个参数用来绑定this
  >
  > @return  [boolean]
  >
  > 原数组不变

  ```js
  let b = [1,2,3].some(item => item===2);
  console.log(b);//=>true
  ```

- every

  > every：查找是否所以内容都满足条件
  >
  > @params	回调函数（三个参数：当前成员、当前位置、整个数组，返回布尔值，如果回调函数有一个返回了false，则some返回false）；第二个参数用来绑定this
  >
  > @return  [boolean]
  >
  > 原数组不变

  ```js
  let b = [1,2,3].every(item => item<4);
  console.log(b);//=>true
  ```

- Array.from():方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

  ```js
  console.log(Array.from('foo'));
  // expected output: Array ["f", "o", "o"]
  
  console.log(Array.from([1, 2, 3], x => x + x));
  // expected output: Array [2, 4, 6]
  ```

- Array.of()：

  > Array.of()：方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。
  >
  > `**Array.of()**` 和 `**Array**` 构造函数之间的区别在于处理整数参数：`**Array.of(7)**` 创建一个具有单个元素 **7** 的数组，而 **`Array(7)`** 创建一个长度为7的空数组（**注意：**这是指一个有7个空位(empty)的数组，而不是由7个`undefined`组成的数组）。

  ```js
  Array.of(7);       // [7] 
  Array.of(1, 2, 3); // [1, 2, 3]
  
  Array(7);          // [ , , , , , , ]
  Array(1, 2, 3);    // [1, 2, 3]
  ```


**数组的链式调用**

> 上面的方法，有不少返回的还是数组，所以可以链式使用

```js
var users = [
    {
    name:'tom',
    email:'tom@example.com'
},
    {
        name:'peter',
        email:'peter@example.com'
    }
];
users.map((item)=>{
    return item.email;
}).filter((item)=>{
    return /^t/.test(item);
}).forEach((item)=>{
    console.log(item);
});//tom@example.com
```




**数组的去重**

- 两种比较low的方式

```js
//方案1：创建一个空数组，遍历数组并判断是否包含这一项，若不包含，，则添加这一项；
let ary1 = [1,2,3,3,2,1,4,2,2];
let ary2 = [];
ary1.forEach(item => {
	ary2.includes(item)?null:ary2.push(item);
});
console.log(ary2); //=>[1,2,3,4]
```

> forEach、includes不能兼容ie678，并且forEach遍历一次，includes本身也需要遍历数组来判断是否包含某一项，性能也不够好

```js
//方案2：遍历数组，每一次拿出一个值，并与后面的每一项比较，若相同，则删除（splice）
let ary1 = [1,2,3,3,2,1,4,2,2];
ary1.forEach((item,index)=>{
	for(let i = index+1;i<ary1.length;i++){
		//需要用i--解决数组塌陷问题
		item === ary1[i]?(ary1.splice(i--,1)):null;
	}
});
console.log(ary1); //=>数组塌陷的结果[1, 2, 3, 4, 2]
//=>解决了数组塌陷后的正确结果：[1, 2, 3, 4]
```

> 二重循环，性能不够好

> 方案2没有实现，存在数组塌陷问题：
>
> 在使用splice之后，改变了原本的数组结构，i后面的每一项都提前了一位，下一次比较的应该还是i索引中的内容。
>
> 如何解决：i--；让索引减一位，

- 较优的方案：基于对象处理

```js
//方案3:创建一个空对象，遍历数组并判断对象中是否存在当前项obj[val]===undefined(不存在，则返回undefined)，若不存在，则存储，若存在，则删除数组中这一项splice-存在数组塌陷问题，需要解决。
let ary1 = [1,2,3,3,2,1,4,2,2];
let obj = {};
for(let i = 0;i < ary1.length;i++){
	//用splice删除：性能不好
	//(obj[ary1[i]]=== undefined)?obj[ary1[i]]=ary1[i]:ary1.splice(i--,1);
	//将最后一项替换删除项，并删除最后一项，并让i--
	(obj[ary1[i]]=== undefined)?obj[ary1[i]]=ary1[i]:(ary1[i--]=ary1[ary1.length-1],ary1.length--);
}	
console.log(ary1); //=>[1, 2, 3, 4]
```

> 一次循环，创建对象来判断，去重的思想是最优的，但代码还需要优化。
>
> 但基于splice实现删除，性能不好。（当前项被删，后面的每一项索引都要向前提一位，如果后面内容过多，一定会影响性能）

封装去重的代码（实现高内聚低耦合）

```js
//加上函数的注释（以后自己写的函数就得这样注释）
/*
 *unique：实现数组去重的方法
 *@params	
 *	ary	[Array]要去重的数组
 *@return
 *	ary [Array]去重后的数组
 *by gaominghui on 20200901
 */
function unique(ary){
	let obj = {};
	for(let i = 0;i < ary.length;i++){
		(obj[ary[i]]===undefined)?(obj[ary[i]]=ary[i]):(ary[i--]=ary[ary.length-1],ary.length--);
	}
	return ary;
}
unique([1,2,3,3,2,1,4,2,2]); //=>[1, 2, 3, 4]
```

- 其他方式（了解）

```js
//基于ES6的Set（对应的Map）实现去重
let ary = [1,2,3,3,2,1,4,2,2];
ary = [...new Set(ary)];
console.log(ary); //=>[1, 2, 3, 4]
```

### 