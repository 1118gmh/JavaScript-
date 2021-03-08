var utils = function() {
    "use strict";
    /**
     * getCss：获取当前元素某一个样式属性值
     */
    let getCss = function(curEle, attr) {
        /^-?\d+(\.\d+)?(px|em|pt|rem)$/i;
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i,
            val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            val = curEle.currentStyle[attr];
        }
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    };
    let setCss = function(curEle, attr, value) {
        let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            //用于兼容IE678
            curEle.style.filter = `alpha(opacity=${value*100})`;
            return;
        }
        if (!isNaN(value)) {
            reg.test(attr) ? value += 'px' : null;
        }
        curEle.style[attr] = value;
    };
    let setGroupCss = function(curEle, options = {}) {
        for (let attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(curEle, attr, options[attr]);
            }
        }
    };
    let css = function(...arg) {
        let len = arg.length,
            fn = getCss;
        if (len >= 3) {
            fn = setCss;
        }
        if (len === 2 && (arg[1] instanceof Object)) {
            fn = setGroupCss;
        }
        return fn(...arg);
    };
    return {
        css: css
    };
}();