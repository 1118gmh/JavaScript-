let a = 10;
if (a <= 0) {
    console.log('哈哈');
} else if (a > 0 && a < 10) {
    console.log('呵呵');
} else {
    console.log('嘿嘿');
}
switch (a) {
    case 1:
        console.log('呵呵');
        break;
    case 5:
        console.log('哈哈');
        break;
    case 10:
        console.log('嘿嘿');
        break;
    default:
        console.log('嘻嘻');
        break;
}