var Blog = require("./../models/blog.js");
var Reply = require("./../models/reply.js");
var async = require("async");

exports.detail = function(req, res) {
    var id = req.params.id;
    async.series({
        blog: function(next) {
            Blog.findOne({
                _id: id
            }, function(err, blog) {
                next(null, blog);
            })
        },
        replies: function(next) {
            Reply.find({
                    blog: id
                })
                .populate("blog", "title")
                .exec(function(err, replies) {
                    if (err) console.log(err);
                    console.log(replies);
                    next(null, replies);
                })
        }
    }, function(err, result) {
        res.render("detail", {
            blog: result.blog,
            replies: result.replies
        })
    })
}


exports.create = function(req, res) {
    res.render("create");
};

exports.save = function(req, res) {
    var blog = new Blog();
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.createAt = Date.now();

    blog.save(function(err, result) {
        if (err) console.log(err);
        console.log(result);
        res.redirect("/index/:");
    })
}

exports.edit = function(req, res) {
    var id = req.params.id;
    console.log(id);
    Blog.findOne({
        _id: id
    }, function(err, blog) {
        if (err) console.log(err);
        res.render("edit", {
            blog: blog
        })
    })
}

exports.update = function(req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    Blog.update({
        _id: id
    }, {
        $set: {
            title: title,
            content: content,
            updateAt: Date.now()
        }
    }, function(err, result) {
        if (err) console.log(err);
        res.redirect("/index/:");
    })
}

exports.delete = function(req, res) {
    Blog.remove({
        _id: req.params.id
    }, function (err, result) {
        if (err) console.log(err);
        res.redirect("/index/:");


    })
}
/*

 exports.count = function (req ,res ) {
    var parms = {};
     Blog.count(parms ,function (err ,res ){
        if(err){
            console.log("Error:" + err);
        }else{
            console.log("Res:" + res);
        }
    })

 }*/
