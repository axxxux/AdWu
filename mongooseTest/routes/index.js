var path  = require("path");
var fs = require("fs");
var multer = require('multer');
var async = require("async");


var upload = multer({
    dest: path.join(__dirname, '../public/uploads')
});

var store = require("./store.js");
var Blog = require("./../models/blog.js");


//首页
exports.index = function(req ,res){
    var  currentSize = 1;
    var currentPage = req.params.page;
    if(currentPage == "")
        currentPage =1
    var size = 5;
    if (currentPage < 1)currentPage = 1;

    async.series({
        count : function (next) {
            Blog.count({},function(err,count){
                next(err,count);
                if(err)console.log(err);
            })
        },
        page : function(next){
            Blog.page(currentPage, size, {}, function(err, blogs) {
                if (err) console.log(err);
                console.log(blogs);
                next(null,blogs);
            });
        }
    },function(err,next){
        if(next.count > size)
            currentSize  =  Math.ceil(next.count/size);
        console.log(next.page);
        console.log(currentSize);
        console.log(next.count);
        console.log(currentPage);

        res.render('index', {
            blogs: next.page,
            pageNum:currentSize,
            count:next.count,
            PageNo:currentPage,

        });
    });

}



/*/!* GET home page. *!/
exports.index = function(req, res) {

    var  currentSize = 1;
    var currentPage = req.params.page;
    console.log("currentPage:"+currentPage);
    if(currentPage == "")
        currentPage =1
    var size = 5;
    if (currentPage < 1)currentPage = 1;


    Blog.count( {}, function(err, result){
        if (err) {
            console.log("Error:" + err);
        }
        console.log("result:" + result);
        return  Number(JSON.stringify(result));
    }).then(function(result){
        if(result > size ){
            currentSize  =  Math.ceil(result/size);
        }
        console.log("result:" + result);
        console.log("currentSize:" + currentSize);

        Blog.page(currentPage, size, {}, function(err, blogs) {
            if (err) console.log(err);
            res.render('index', {
                blogs: blogs,
                pageNum:currentSize,
                count:result,
                PageNo:currentPage,

            });
        });
    });
};*/


exports.upload = function(req, res) {
    res.render("upload");
};



exports.saveUpload = function (req,res){
    console.log(req);
    var key =  req.file.filename;
    var localFile = req.file.path;
    store.uploadFile(key,localFile,function (req ,ret ){
        if(!err){
            //上传成功。处理返回值
            console.log(ret.hash,ret.key,ret.persistentId);

            //上传成功，删除本地文件
            fs.unlink(localFile,function(err,result){
               if(err){
                   console.log(err);
               }else{
                   console.log(result);
               }
            });
        }else{
            //上传失败
            console.log(err);
        }
    });
    res.send({
       body:req.body
    });
}