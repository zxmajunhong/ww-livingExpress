var express = require('express');
var router = express.Router();
var path = require('path');
var xtpl = require('xtpl');
var fs= require('fs');

var app = express();

//视图模版
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','xtpl');


//使用静态资源
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/test',function(req,res){
	res.render('test.xtpl',{});
})*/

//路由
router.get('/:html',function(req,res){
	var _html = req.params.html || "";
	var navTag = _html.replace(".html","");
	res.render('layout/base',{
		title:"沃安沃",
		navTag:navTag
	},function(err,html){
		// fs.writeFile("public/"+_html,html,function(werr){
		// 	if(werr){
		// 		console.log("写入错误：",err);
		// 	}
		// });
		res.send(html);
	});
});

app.use('/',router);

app.listen(8200);
console.log("已经启动项目");

module.exports = app;