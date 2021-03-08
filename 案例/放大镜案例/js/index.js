~ function() {
    //1. 鼠标进入离开smallBox时mark和bigBox的显隐
    //2. 控制mark跟随鼠标在smallBox中移动
    //3. 当mark移动时，largeBox中的图片跟随移动
    let $magnigierBox = $('.magnigierBox'),
        $smallBox = $magnigierBox.find('.smallBox'),
        $mark = $magnigierBox.find('.mark'),
        $bigBox = $magnigierBox.find('.bigBox'),
        $bigImg = $bigBox.find('img');
    //计算当前移动盒子位置，以及大图片位置
    let computedMark = function(event) {
        let minL = 0,
            minT = 0,
            maxL = $smallBox.outerWidth() - $mark.outerWidth(),
            maxT = $smallBox.outerHeight() - $mark.outerWidth(),
            curL = event.pageX - $smallBox.offset().left - $mark.outerWidth() / 2,
            curT = event.pageY - $smallBox.offset().top - $mark.outerHeight() / 2;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        $mark.css({
            left: curL,
            top: curT
        });
        $bigImg.css({
            left: -curL * 3,
            top: -curT * 3
        });
    };
    //实现鼠标进入或离开时，mark、bigBox的显隐
    $smallBox.on('mouseenter', (event) => {
        $mark.add($bigBox).css('display', 'block');
        computedMark(event);
    }).on('mouseleave', () => {
        $mark.add($bigBox).css('display', 'none');
    }).on('mousemove', (event) => {
        computedMark(event);
    });
}();