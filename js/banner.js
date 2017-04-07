/*
控制banner图
type  　　　　　banner图的类型　fade  slide  默认值　"fade"
time  　　　　　banner图转换的时间间隔        默认值　4000
pointString   banner图下方的小点            默认值　"#banner-point"
banString     banner图内容的容器            默认值　"#banner-imgs"
pointActive　　下方小点被选中的样式Class名称   默认值　"point-active"
left          banner图向左按钮　　　　　　　　默认值　　'#banner-left'
right         右按钮　　　　　　　　　　　　　　默认值　　'#banner-right'
*/
function banner(type,time,pointString,banString,pointActive,left,right){
      pointString       = pointString||'#banner-point';
      banString         = banString||'#banner-imgs';
      type              = (type||'fade').toLowerCase();
      time              = time||4000;
      time              = type=="slide"?time+2000:time;
      pointActive       = pointActive||"point-active";
      left              = left||'#banner-left';
      right             = right||'#banner-right';
      var $banner       = $("#banner");
      //找到每个point对象
      var $pointObj     = $(pointString);
      var $pointChild   = $pointObj.children();
      var length        = $pointChild.length;
　　　//找到每个图的容器对象
      var $banObj       = $(banString);
      var $banChild     = $banObj.children();
      var banChildWidth = $banChild.eq(0).width();
      var index         = 0;
      var maxIndex      = length - 1;
      var timer         = null;
     //找到两个耳朵
      var $banBox       = $('#banner');
      var $leftA        = $banBox.children(left);
      var $rightA       = $banBox.children(right);
      if(type=="slide"){
           turnToSlide();
      }
      //将元素转变成slide需要的结构
      function turnToSlide(){
           $banChild.css({
             "position"   : 'static',
             "float"      : 'left',
           });
           $banObj.css({
             "position"      : 'static',
             "width"         :  banChildWidth*length+'px',
             "margin-top"  : 0,
             "margin-left" : 0,
           });
      }
      //渐变效果　fade
      function fade(i){
        $banChild.eq(i).stop(false,true).fadeIn().siblings().hide();
      };
      //滑动效果
      function slide(i){
        $banObj.stop().animate({
          "margin-left":-banChildWidth*i+'px',
        },2000,'swing',function(){
          //timeChangeIndex();
        });
      };
      //效果的转变 fade slide
      function banChange(i){
        i = i||0;
        $pointChild.eq(i).addClass(pointActive).siblings().removeClass(pointActive);
        type=="fade"?fade(i):slide(i);
      };
      //通过point来切换
      function hoverPoint(){
        $pointChild.hover(function(){
            clearInterval(timer);
            index = $(this).index();
            banChange(index);
        },function(){
          timeChangeIndex();
        });
      }
      //通过左右按钮切换
      function btnLR(){
          $banner.hover(function(){
            $leftA.show();
            $rightA.show();
          },function(){
            $leftA.hide();
            $rightA.hide();
          });
　　　　　　$leftA.click(function(){
               clearInterval(timer);
               index = index == 0?maxIndex:index-1;
               banChange(index);
               timeChangeIndex();
          });
          $rightA.click(function(){
               clearInterval(timer);
               index = index == maxIndex?0:index+1;
               banChange(index);
               timeChangeIndex();
          });
      }
      //随着时间变化变换图片
      function timeChangeIndex(){
          timer = null;
          timer = setInterval(function(){
              index = index==maxIndex?0:index+1;
              banChange(index);
          },time);
      }

      //最终的初始函数，主要用来注册事件 给外部调用的借口
      function init(){
         banChange();
         timeChangeIndex();
         hoverPoint();
         btnLR();
      };

      //返回给外部调用的属性以及方法
      return {
         length:length,
         init  :init,
      };
};
