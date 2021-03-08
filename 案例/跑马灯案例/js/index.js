let wrapper = document.querySelector('.wrapper');
/**
 * 实现JS动画
 *  让wapper每隔一段时间（最优动画时间间隔13-17毫秒）在原有的基础上减去步长（快一点，步长就大一点）
 */
//1. 将wrapper中原有的LI整体克隆一份放到容器的末尾（为了实现无缝滚动）
wrapper.innerHTML += wrapper.innerHTML;
utils.setCss(wrapper, 'width', utils.setCss(wrapper, 'width') * 2);
//设置动画
setInterval(() => {
    //1. 获取wrapper的left的值,减去步长,把最新的步长赋值给元素
    let curl = utils.setCss(wrapper, 'left');
    curl -= 2;
    utils.setCss(wrapper, 'left', curl);
    //2. 实现无缝：
    //当ul盒子左偏移整个ul盒子的一半，则让wrapper立即运动到left为零的位置
    if (Math.abs(wrapper.offsetLeft) >= utils.setCss(wrapper, 'width') / 2) {
        utils.setCss(wrapper, 'left', 0);
    }
}, 13);