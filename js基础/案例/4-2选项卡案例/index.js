let tabBox = document.getElementById('tabBox');
let tabList = tabBox.getElementsByTagName('div');
let navBox = document.getElementById('navBox');
let navList = navBox.getElementsByTagName('li');
for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = function() {
        changeTab(i);
    }
}

function changeTab(index) {
    for (let i = 0; i < navList.length; i++) {
        navList[i].className = '';
        tabList[i].className = '';

    }
    navList[index].className = 'action';
    tabList[index].className = 'action';
}