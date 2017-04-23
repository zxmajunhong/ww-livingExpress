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
router.get(/.*html$/,function(req,res){
	console.log('进入',req.url);
	var _html = req.params.html || "index";
	var navTag = req.url.replace(".html","").replace('/','');
	console.log(navTag);
	res.render('layout/base',{
		title:"LivingExpress",
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

router.get(/\b(Outdoor|Indoor|Pets|Storage)\b/,function(req,res){
	console.log('进入2',req.url);
	var navTag = req.url.replace('/','');
	var jsonData = JSON.parse(fs.readFileSync('./jsonfile/products.json'));
	var productData = jsonData[navTag] || [];
	res.render('layout/base',{
		title:navTag,
		navTag:'products',
		productData:productData
	},function(err,html){
		res.send(html);
	})
	console.log(jsonData);
})

app.use('/',router);

app.listen(8200);
console.log("已经启动项目");

module.exports = app;