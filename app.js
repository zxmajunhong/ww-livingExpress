var express = require('express');
var router = express.Router();
var path = require('path');
var xtpl = require('xtpl');
var fs= require('fs');
var multiparty = require('multiparty');
var util = require('util');
var bodyParser = require('body-parser');


var app = express();

//视图模版
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','xtpl');


//使用静态资源
app.use(express.static(path.join(__dirname, 'public')));
//引用不然post获取不到参数
app.use(bodyParser.urlencoded({ extended: false }))  
app.use(bodyParser.json());
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

//每个列表的产品列表
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
});

//产品详情页
router.get('/detail/:id',function(req,res){
	console.log('进入详情',req.params.id);
	var jsonData = JSON.parse(fs.readFileSync('./jsonfile/productDetails.json'));
	var detailData = jsonData[req.params.id] || {};
	console.log(detailData);
	res.render('layout/base',{
		title:'详情',
		navTag:'productdetail',
		detailData:detailData
	},function(err,html){
		res.send(html);
	});
});

//编辑产品
router.get('/edit',function(req,res){
	console.log('进入编辑');
	var pid = global.pid || 1; //当前产品id
	res.render('edit',{
		pid:pid
	},function(err,html){
		res.send(html);
	})
});

//上传文件
router.post('/uploadfile',function(req,res){
	var form = new multiparty.Form({uploadDir:'./public/img/temp'});
	var resFileUrlArry = [];
	var pid = global.pid || 1; //全局产品id
	form.parse(req,function(err,fields,files){
		debugger;
		var reFolder = 'public/img/pdetail/'+pid; //当前上传文件最终要存放的文件夹地址
		console.log(reFolder);
		if(!fs.existsSync(reFolder)){
			fs.mkdirSync(reFolder);
		}
		//该文件夹下所存在的文件数量
		var existsFilesLength = fs.readdirSync(reFolder).length || 0;
		files.files.forEach(function(file,index,array){
			console.log(file.path);
			console.log(file.originalFilename);
			var existsFils = fs.readdirSync(reFolder);
			var reFilePath = reFolder+'/p'+(index+existsFilesLength)+'.jpg'; //修改后的文件地址
			fs.renameSync(file.path,reFilePath);
			resFileUrlArry.push(reFilePath);
		})
		console.log('输出的文件地址',resFileUrlArry);
		res.json({path:resFileUrlArry});
	})
});

//获取当前编辑的产品id对应的产品图片
router.post('/editsave', function(req,res){
	console.log('初始参数',req.body);
	var params = JSON.parse(req.body.params);
	console.log('传入的参数',params);
	var pid = global.pid || 1;
	var result = {};
	try {
		var nowProducts = JSON.parse(fs.readFileSync('./jsonfile/products.json'));
		var nowItemList = nowProducts[params.itemType] || []; //当前产品类别数据列表
		nowItemList.push({
			"id":pid,
			"url":params.url,
			"name":params.name,
			"price":params.price
		}); //插入当前保存的数据
		console.log('当前产品类别的数据列表',nowItemList);
		nowProducts[params.itemType] = nowItemList;
		var nowProductDetails = JSON.parse(fs.readFileSync('./jsonfile/productDetails.json')); //当前详情数据列表
		nowProductDetails[pid] = {
			"imgList":params.imgList,
			"attribute":params.attribute,
			"description":params.description
		}
		console.log('当前产品详情数据列表',nowProductDetails);
		//写入文件
		fs.writeFileSync('./jsonfile/products.json',JSON.stringify(nowProducts));
		fs.writeFileSync('./jsonfile/productDetails.json',JSON.stringify(nowProductDetails));
		global.pid = pid + 1;
		result = {msg:'保存成功'};
	}catch(err){
		result = {msg:'保存失败',err:err};
	}
	res.json(result);
})

app.use('/',router);

app.listen(8200);
console.log("已经启动项目");

module.exports = app;