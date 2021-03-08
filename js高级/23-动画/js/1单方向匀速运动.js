       //固定步长的匀速运动
       let $box = $('.box');
       //let step = 5;
       let maxL = $(window).outerWidth() - $box.outerWidth();
       // let timer = setInterval(() => {
       //     let curL = $box.offset().left;
       //     curL += step;
       //     if (curL >= maxL) {
       //         //如果超了，直接跳到末尾，清除定时器
       //         $box.css('left', maxL);
       //         clearInterval(timer);
       //         return;
       //     }
       //     $box.css('left', curL);
       // }, 17);

       //固定时间的匀速运动
       // let duration = 1000,//总时间
       //     interval = 17,//频率
       //     change = maxL-0;//总距离
       //1. 第一种思路：算出步长=总距离/总时间*频率，然后做固定步长的匀速运动
       //2. 在JS中基于定时器完成动画，不论是固定步长还是固定时间，只要算出当前盒子应该滚动的位置即可（新的位置信息）

       //t:time当前运动的时间
       //d：duartion总时间
       //b：begin起始位置
       //c：change总距离（target-begin）
       //t/d*c+b：当前盒子应该有的位置
       let t = 0,
           d = 10000,
           b = 0,
           target = maxL, //目标位置
           c = maxL - 0,
           interval = 17; //频率:多长时间迈一步
       let timer = setInterval(() => {
           t += interval;
           let curL = t / d * c + b;
           if (t > d) {
               $box.css('left', target);
               clearInterval(timer);
               return;
           }
           $box.css('left', curL);

       }, interval);