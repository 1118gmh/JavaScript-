1. 获取元素

   获取【list、headerBox、linkAry、productAry】

2. 获取数据和实现数据的动态绑定

   - 获取数据

     创建一个productData变量，设为null，

     创建AJAX实例

     打开一个请求地址（请求方式get，地址，false同步）

     通信成功是获取数据并绑定productData变量

     实际发送请求为null

   - 数据解析

   - 动态绑定

     使用解构赋值获取productDate数据

     使用模板字符串拼接数据

     将字符串添加到页面中

3. 点击操作

   - 循环给每一个所有的a绑定事件

     - 给每个a元素设置flag、index属性

     - 开始绑定点击事件

       每次点击事件让其他元素的flag属性回归初始状态-1

       让当前事件的flag属性*-1

       执行sortList()方法

   - 编写sortList()方法（需要改变this，不能使用箭头函数）

     - 把类数组转换为数组
     - 把数组进行排序
     - 将排序号的数组循环添加到页面中去