// 获取 container
const container = document.querySelector('.container');
// 获取 lis
const lis = document.querySelectorAll('.controls li');
// 获取 downs
const downs = document.querySelectorAll('.down-link');
// 声明页面高度
let viewHeight = document.body.clientHeight;
// 索引号
let index = 0;
// 是否滚动
let rolls = false;

// 窗体改动事件
const getWindowInfo = () => {
    viewHeight = document.body.clientHeight;
    roll(index);
};
// 添加窗体改动事件
window.addEventListener('resize', getWindowInfo);

// 鼠标滚动事件
const mouseRoll = (e) => {
    // 判断是否在滚动
    if (!rolls) {
        // 判断鼠标滚动
        if (e.wheelDelta > 0) {
            if (--index < 0) {
                index = 0;
            }
        } else {
            if (++index > lis.length - 1) {
                index = lis.length - 1;
            }
        }

        // 滚动页面
        roll(index);
    }
};

// 添加滚动事件
document.addEventListener('mousewheel', mouseRoll);

// 绑定点击事件
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        index = i;
        roll(index);
    }
}

// 绑定点击事件
for (let i = 0; i < downs.length; i++) {
    downs[i].onclick = function () {
        index = i + 1;
        roll(index);
    }
}

// 改变li的颜色
function changeColor(index) {
    for (let i = 0; i < lis.length; i++) {
        lis[i].className = '';
    }
    lis[index].className = 'active';
}

function roll(index) {
    rolls = true;

    // 添加动画
    if (index == 1) {
        document.querySelector('.skill-pane').classList.add('skill-animation');
    }
    if (index == 2) {
        document.querySelector('.time-ul').classList.add('time-line-animation');
    }

    // 滚动页面
    container.style.top = -index * viewHeight + 'px';

    // 改变颜色
    changeColor(index);

    // 添加延迟
    setTimeout(function () {
        // 滚动取消
        rolls = false;

        // 删除动画
        if (index != 1) {
            document.querySelector('.skill-pane').classList.remove('skill-animation');
        }
        if (index != 2) {
            document.querySelector('.time-ul').classList.remove('time-line-animation');
        }
    }, 500);
}