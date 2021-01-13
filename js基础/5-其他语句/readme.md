### 调试bug语句

> debugger;

> 停止js的执行，相当于设置断点

```js
for(let i = 0;i < 10;i++){
    debugger;
    console.log(i);
}
```

> 设置debugger;
>
> 调试时浏览器会执行到设置的debugger的位置；
>
> 可以通过F10来一步一步执行代码
>
> 也可以通过F8来一段一段执行代码

### 模块的导入导出语句

> export：用来导出模块，以便这些函数能够被导入到外部模块或者其他脚本中去
>
> import：用来导入外部的模块或另一个script中导出的模块

```js
//导出一个常量
export const foo = Math.sqrt(2)

//导入
import { foo } from './export'
import * as Tools from './export' //作为对象导出；使用 Tools.foo
```

```js
function myFunction(){}
//导出已经声明的函数
export { myFunction }

//导入
import { myFunction } from './export'
```

```js
//多个导出
export function cube(x: number): number {
    return x * x * x
}
const foo:number = Math.PI * Math.sqrt(2)
export { foo } //导出多个

//导入
import { cube , foo } from './export'
```

```js
//默认导出函数
export default function(){}
export default function fun(){}

//导入
import myFunction from './export' //可以任取变量名
//如果导出默认，定义函数名或者变量名，或者类名
//导入的时候可以写和原来相同的名字，也可以取任意变量名
```

```js
//默认导出类
import default class{}

//导入
import Test from './export'
```

> 一个模块默认导出只能有一个，可以使函数，类，对象等

```js
//导出多个模块内容
export function query (){}
export function update (){}
//导入整个模块内容
import * as API from './export'
```

> 将整个模块作为附加功能导入，但是不导入模块的导出成员

```js
import 'my-module'
```

### 标记语句

> 语法：
>
> ```js
> lable :
> 	statement
> ```
>
> label：任何不属于保留关键字的js标识符
>
> statement：js语句。break可以用于任何标记语句，而continue可用于循环标记语句。

> 可使用一个标签来唯一标记一个循环，然后使用 break 或 continue 语句来指示程序是否中断循环或继续执行。
>
> 需要注意的是，JavaScript 没有 goto 语句，标记只能和 break 或 continue 一起使用。
>
> 在严格模式中，你不能使用 “let” 作为标签名称。它会抛出一个 SyntaxError（因为 let 是一个保留的标识符）。

### with语句（不推荐使用，ES5严格模式下已禁止使用）

> 语法：
>
> ```js
> with(expression){
>     statement
> }
> ```
>
> expression：
>
> 将给定的表达式添加到在评估语句时使用的作用域链上。表达式周围的括号是必需的。
>
> statement：
>
> 任何语句。要执行多个语句，请使用一个块语句 ({ … }) 对这些语句进行分组。