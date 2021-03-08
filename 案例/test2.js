//reuqire导入的时候，首先把test模块中的代码自上而下执行，把exports对应的堆内存导入进来，所以接收到的结果是一个对象（require是一个同步操作）
console.log(3);
let test1 = require('./test'); //=>./是当前文件的某个模块；.js可以省略；
console.log(4);
console.log(test1.fn(10));