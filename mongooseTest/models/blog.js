var mongoose =require("mongoose");
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title : String ,
    content : String ,

    createAt : {
        type :Date,
        default : Date.now
    },

    updateAt : {
        type : Date
    },

    view :{
        type : Number,
        default:0
    },

    replyCount :{
        type :Number,
        default : 0
    }

});

// BlogSchema的静态方法，用于封装复用性比较高的一些方法
//下面是分页的方法，具体的方法怎么使用参见 http://mongoosejs.com.docs/guide.html
BlogSchema.statics = {
    page : function(no,size,opt,cb) {
        this.find(opt)
            .skip((no - 1 ) * size)
            .limit(size)
            .sort({
                createAt: -1
            })
            .exec(cb)
    }
}

module.exports = mongoose.model("Blog" ,BlogSchema);