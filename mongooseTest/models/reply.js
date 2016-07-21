var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ReplySchema = new Schema({
    blog: {
        type: ObjectId,
        ref: "Blog"
    },
    content: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    up: {
        type: Number,
        default: 0
    },
    down: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Reply", ReplySchema);