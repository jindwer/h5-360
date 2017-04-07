// var $stable = $('.stable');
// var $beta   = $('.beta');
var $boxA   = $('.f7>.box>a');
$boxA.click(function(){
  $("."+($(this).addClass("active").siblings().removeClass('active').end().attr("class").split(" ")[0]).split("-")).show().siblings().hide();
});
//input搜索框
var word = "";
$('input[name="word"]').focus(function(){
  word = $(this).next().hide().end().val();
  $(this).val("");
}).blur(function(){
  $(this).val(word).next().show();
});
//topic的slide-bar
$('.slide-bar-box').hover(function(){
  $(this).find('.slide-bar').show();
},function(){
  $(this).find('.slide-bar').hide();
});
//to top
var $top = $('.to-top');
$(window).scroll(function(){
  $(this).scrollTop()>70?$top.show():$top.hide();
});
$top.click(function(){
  $(window).scrollTop(0);
});
//bar change
$('.bar-close').click(function(){
   //$(this).parent().slideUp();
   $(this).hide().parent().animate({height:0},1500);
});
//明星用户详情
var $stars = $('.star-head-img');
var starsWidth = $stars.outerWidth();
var starsPWidth = $stars.parent().outerWidth();
var offsetWidth = (starsPWidth-starsWidth)/2;
var starInfoWidth = $('.star-info').outerWidth();
//console.log($stars[0],$stars.eq(0),$stars.get(0));
$stars.mouseenter(function(){
    var check = $(window).width()-$(this).offset().left;
    var $starInfoBox = $(this).siblings('.star-info');
    var img = $(this).children().attr("src");
    $starInfoBox.find('.info-img img').attr({"src":img});
    if(check>starInfoWidth){
      $starInfoBox.css({
        left:offsetWidth+"px",
      }).show();
    }else{
      $starInfoBox.css({
        left:starsPWidth-starInfoWidth-offsetWidth+"px",
      }).show();
    }
}).mouseleave(function(){
   $(this).siblings('.star-info').hide();
});
$('.star-info').hover(function(){
  $(this).show();
},function(){
  $(this).hide();
});
