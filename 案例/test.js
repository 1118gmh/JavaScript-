let a = 12,
    fn = b => {
        return a + b;
    };
console.log(1);
exports.fn = fn; //将当前模块的函数放到exports导出对象中（这样可以基于equire在其他模块中导入）
console.log(2);