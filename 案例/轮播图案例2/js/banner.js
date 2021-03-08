~ function() {
    let bannerRender = function() {
        let $container = $('#container'),
            $wrapper = $container.children('.wrapper'),
            $focus = $container.children('.focus'),
            $arrowLeft = $container.children('.arrowLeft'),
            $arrowRight = $container.children('.arrowRight'),
            $slideList = null,
            $foucsList = null;
        let queryData = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    method: 'get',
                    url: 'json/banner.json',
                    async: true,
                    dataType: 'json',
                    success: (res) => {
                        resolve(res);
                    }
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
                strSlide += `<li><img src="${img}" alt="${desc}"></li>`;
                strFocus += `<li></li>`;
            });
            $wrapper.html(strSlide);
            $focus.html(strFocus);
            $slideList = $wrapper.children('li');
            $foucsList = $focus.children('li');
        };
        return {
            init: () => {
                let promise = queryData();
                promise.then(data => {
                    bindHTML(data);
                });
            }
        }
    }();
    bannerRender.init();
}();