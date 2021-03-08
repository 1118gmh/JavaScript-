let $box = $('.box');
let interval = 17;
let time = 0,
    duration = 5000;


// let begin = {
//     left: 0,
//     top: 0
// };
let begin = {};
let target = {
    left: 500,
    top: 500,
    width: 50,
    height: 50
};
let change = {};
for (let attr in target) {
    if (target.hasOwnProperty(attr)) {
        begin[attr] = parseFloat(window.getComputedStyle($box[0])[attr]);
        change[attr] = target[attr] - begin[attr];
    }
}
let animateTimer = setInterval(() => {
    time += interval;
    //=>根据目标值的方向，基于公式计算出每一个方向的位置
    let cur = {};
    for (let attr in target) {
        if (target.hasOwnProperty(attr)) {
            cur[attr] = time / duration * change[attr] + begin[attr];
        }
    }
    if (time > duration) {
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                $box.css(key, target[key]);
            }
        }
        clearInterval(animateTimer);
        return;
    }
    for (let key in cur) {
        if (cur.hasOwnProperty(key)) {
            $box.css(key, cur[key]);
        }
    }
}, interval);