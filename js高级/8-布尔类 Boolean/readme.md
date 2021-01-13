### Boolean布尔数据类型

> 只有两个值 true/false

1. 把其他类型值转换为布尔类型

> 只有**0、NaN、''、null、undefined**这5个值转换为false，其余转换为true。

- Boolean([val])

  ```js
  console.log(Boolean(0));//false
  console.log(Boolean(''));//false
  console.log(Boolean(' '));//true
  console.log(Boolean(null));//false
  console.log(Boolean(undefened));//false
  console.log(Boolean([]));//true
  ```

  

- !/!!：！（先转换为Boolean再取反）！！（取反再取反），相当于转换为Boolean

  ```js
  console.log(!1);//false
  console.log(!!1);//true
  ```

  

- 条件判断

  ```js
  if(1){
  	console.log(1);
  }
  ```

**Boolean类中的方法**

- toString
- valueOf