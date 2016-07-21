var Reply = require('./../models/reply.js');

exports.save = function(req, res) {
    var blogId = req.body.blogId;
    var reply = new Reply();
    reply.blog = blogId;
    reply.content = req.body.content;
    reply.createAt = Date.now();

    reply.save(function(err, result) {
        if (err) console.log(err);
        res.redirect("/blog/detail/" + blogId);
    })
}