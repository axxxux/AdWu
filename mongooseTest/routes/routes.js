var Index = require("./index.js");
var Blog = require("./blog.js");
var Reply = require("./reply.js");
var User = require("./user.js");


module.exports = function(app) {
  app.get("/index/:page", Index.index);
  app.get("/user", User.index);
  app.get("/blog/detail/:id", Blog.detail);
  app.get("/create", Blog.create);
  app.post("/save", Blog.save);
  app.post("/update", Blog.update);
  app.get("/blog/edit/:id", Blog.edit);
  app.get("/blog/delete/:id", Blog.delete);

  app.post("/reply/save", Reply.save);
}