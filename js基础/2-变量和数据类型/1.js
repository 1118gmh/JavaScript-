console.log('hello word!');

//==:用来进行比较的
console.log(NaN == NaN);
//isNaN([val])
console.log(isNaN(10)); //false
console.log(isNaN('AA')); //true
console.log(isNaN('10')); //false
//字符串转化成数字
console.log(Number('12.5')); //12.5
console.log(Number('12.5.5')); //NaN
console.log(Number('')); //0
//布尔转换成数字
console.log(Number(true)); //1
console.log(Number(false)); //0
//引用转数字：先基于tostring方法转换为字符串，再讲字符串转换为数字
console.log(Number({ name: '10' })); //NaN
console.log(Number([])); //数组0
console.log(Number([12])); //12
console.log(Number([12, 23])); //NaN

console.log(parseInt("12.5px")); //12
console.log(parseFloat("12.5px")); //12.5
console.log(parseInt("width:12.5px")); //NaN

let ary = [12, '哈哈', true, 13];
console.log(ary.length); //=>4
console.log(ary[1]); //=>哈哈
console.log(ary[ary.length - 1]); //=>13