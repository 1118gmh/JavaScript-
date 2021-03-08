let wrapper = document.querySelector('.wrapper');
wrapper.innerHTML += wrapper.innerHTML;
utils.setCss(wrapper, 'width', utils.setCss(wrapper, 'width') * 2);
setInterval(() => {
    let wrapperLeft = utils.setCss(wrapper, 'left');
    wrapperLeft -= 2;
    utils.setCss(wrapper, 'left', wrapperLeft);
    if (Math.abs(wrapper.offsetLeft) >= utils.setCss(wrapper, 'width') / 2) {
        utils.setCss(wrapper, 'left', 0);
    }
}, 13);