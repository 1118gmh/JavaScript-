~ function() {
    let bannerRender = (function() {
        let $container = $('#container'),
            $wrapper = $container.children('.wrapper'),
            $focus = $container.children('.focus'),
            $arrowLeft = $container.children('.arrowLeft'),
            $arrowRight = $container.children('.arrowRight'),
            $slideList = null,
            $focusList = null;
        let queryData = function() {
            return new Promise((resolve, reject) => {
                $.ajax({
                    method: 'get',
                    url: 'json/banner.json',
                    dataType: 'json',
                    async: true,
                    success: resolve,
                    error: reject
                        // success: data => {
                        //     resolve(data);
                        // },
                        // error: msg => {
                        //     //失败后执行的回调函数msg中存储了失败的信息
                        //     reject(msg);

                    // }
                });
            });
        };
        let bindHTML = function(data) {
            let strSlide = ``,
                strFocus = ``;
            $(data).each((index, item) => {
                let {
                    img,
                    desc
                } = item;
                strSlide += `<div><img src="${img}" alt="${desc}"></div>`;
                strFocus += `<li class="${index === 0?'active':''}"></li>`;
            });
            $wrapper.html(strSlide);
            $focus.html(strFocus);
            $slideList = $wrapper.find('div');
            $focusList = $focus.find('li');
        };
        //=>自动轮播
        let _index = 0, //当前展示的索引
            _lastIndex = 0, //上一次展示的图片索引    
            _timer = null, //自动轮播的定时器
            _interval = 1000, //多久切换一次
            _speed = 200; //每次切换的时间
        let changeFocus = function() {
            $focusList.eq(_index).addClass('active');
            $focusList.eq(_lastIndex).removeClass('active');
        };
        //slide切换
        let changeSlide = function() {
            /**
             * 切换思路
             * 1. 让当前的zIndex变为1，并且让上一个的zIndex=0（这样是为了保证不管结构是考前还是靠后，时钟当前这个层级最高）
             * 2. 让当前的实现渐现效果
             * 3. 当前渐现后，让上一个透明度为0
             * 4. 让上一张索引变为当前索引
             */
            let $cur = $slideList.eq(_index),
                $last = $slideList.eq(_lastIndex);
            $cur.css('zIndex', 1);
            $last.css('zIndex', 0);
            $cur.stop().animate({ opacity: 1 }, _speed, () => {
                //动画结束后
                $slideList.eq(_lastIndex)
                    .css({
                        opacity: 0
                    });
                _lastIndex = _index;
            });
            changeFocus();
        };
        let autoMove = function() {
            _index++;
            //边界判断
            if (_index > $slideList.length - 1) {
                _index = 0;
            }
            changeSlide();
        };
        let handleMouse = function() {
            $container.on('mouseenter', function() {
                clearInterval(_timer);
                $arrowLeft.css('display', 'block');
                $arrowRight.css('display', 'block');
            }).on('mouseleave', function() {
                _timer = setInterval(autoMove, _interval);
                $arrowLeft.css('display', 'none');
                $arrowRight.css('display', 'none');
            });
        }
        let handleArrow = function() {
            $arrowRight.on('click', autoMove);
            $arrowLeft.on('click', function() {
                _index--;
                if (_index < 0) {
                    _index = $slideList.length - 1;
                }
                changeSlide();
            });
        };
        let handleFocus = function() {

            $focusList.on('click', function() {
                let currentIndex = $(this).index();
                if (_index === currentIndex) {
                    return;
                }
                _index = currentIndex;
                changeSlide();
            });
        };
        return {
            init: function() {
                let promise = queryData();
                promise.then(data => {
                    bindHTML(data);
                }).then(() => {
                    _timer = setInterval(autoMove, _interval);
                }).then(() => {
                    handleMouse();
                    handleArrow();
                    handleFocus();
                });
            }
        };
    })();

    bannerRender.init();

}();