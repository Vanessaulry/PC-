//导入less文件
import '../less/index.less';

/*
    头部JS
 */
const navliNodes = document.querySelectorAll('.nav li');
const arrowNode = document.querySelector('.arrow');

//缓存小箭头一半的宽度
const arrowHalfWidth = arrowNode.offsetWidth/2;


//循环遍历绑定li点击事件
for (let i = 0; i < navliNodes.length; i++) {
  navliNodes[i].onclick = function () {
    //同步nowIndex和i的值
    nowIndex = i;
    move(nowIndex);
  };
};

//初始化使开始时小箭头到第一个下面
arrowNode.style.left = navliNodes[0].getBoundingClientRect().left + navliNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';


/*
    内容区JS
 */

//获取ul
let ulNode = document.querySelector('#content>ul');
//获取content
let contentNode = document.querySelector('#content');

//获取content的高度
let contentNodeHight = contentNode.offsetHeight;

//设置li的下标
let nowIndex = 0;

//设置定时器初始值
let wheelTimer = null;

//ie/chrome
document.onmousewheel = wheel;

//firefox
document.addEventListener && document.addEventListener('DOMMouseScroll',wheel);


//滚轮事件
function wheel(event) {
  event = event || window.event;


  //函数防抖
  clearTimeout(wheelTimer);
  wheelTimer = setTimeout(() => {
    let flag = '';
    if (event.wheelDelta) {
      //ie/chrome
      if (event.wheelDelta > 0) {
        flag = 'up';
      } else {
        flag = 'down';
      }
    } else if (event.detail) {
      //firefox
      if (event.detail < 0) {
        flag = 'up';
      } else {
        flag = 'down';
      }
    }

    switch (flag) {
      case 'up' :
        if(nowIndex > 0){
          nowIndex--;
          move(nowIndex);
        };
        break;
      case 'down' :
        if(nowIndex < 4) {
          nowIndex++;
          move(nowIndex);
          break;
        };
    };
  }, 200);

  //禁止默认行为
  event.preventDefault && event.preventDefault();
  return false;
}

//三位一体
function move(nowIndex) {
  //循环遍历使得刚开始所有的li的class都为空
  for (var j = 0; j < navliNodes.length; j++) {
    navliNodes[j].className = '';
  }
  ;
  //当前点击的li拥有active属性
  navliNodes[nowIndex].className = 'active';
  //切换小箭头的位置
  arrowNode.style.left = navliNodes[nowIndex].getBoundingClientRect().left + navliNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
  //内容区ul的Top
  ulNode.style.top = -nowIndex * contentNodeHight + 'px';
};

//修正小尖尖和ul的位置
window.onresize = function () {
  //修正小尖尖位置
  arrowNode.style.left = navliNodes[nowIndex].getBoundingClientRect().left + navliNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
  //修正ul的位置
  contentNodeHight = contentNode.offsetHeight;
  ulNode.style.top = -nowIndex * contentNodeHight + 'px';
}