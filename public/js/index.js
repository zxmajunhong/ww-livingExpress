(function($){
	console.log('首页');
	//首页banner滚动
	$(".J_topbannerslide").slide({
		mainCell: ".bd ul",
		autoPlay: true
	});

	//产品滚动行的滚动效果
	$(".J_productslide").slide({
		mainCell: ".bd ul",
		autoPage: true,
		effect: "left",
		autoPlay: true,
		vis: 3
	});
	
	// //产品列表鼠标移上去显示的效果
	// $(".products-table-box").delegate('li .li-box', 'mouseover', function(e) {
	// 	$(this).find(".des").animate({bottom:'0px'},'normal')
	// });

	// $(".products-table-box").delegate('li .li-box', 'mouseleave', function(e) {
	// 	$(this).find(".des").animate({bottom:'-83px'},'normal')
	// });

	// //产品滚动列表鼠标移上去显示的效果
	// $(".list-box").delegate('li .li-box', 'mouseover', function(e) {
	// 	$(this).find(".des").animate({bottom:'0px'},'normal')
	// });

	// $(".list-box").delegate('li .li-box', 'mouseleave', function(e) {
	// 	$(this).find(".des").animate({bottom:'-127px'},'normal')
	// });
	
	// $(".box1 .title").click(function() {
	// 	var _index = $(".box1 .title").index($(this));
	// 	$(this).addClass('cur').siblings().removeClass('cur');
	// 	$(".products-table-box ul").eq(_index).show().siblings().hide();
	// });
})(jQuery)