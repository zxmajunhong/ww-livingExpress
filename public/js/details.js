$(function(){
  //详情页图片轮播
  $('.big-img').slide({
    mainCell: '.img-list',
    targetCell: '.left-img .hd',
    autoPage: true,
    effect: 'left',
    autoPlay: true,
    vis: 1
  })
})