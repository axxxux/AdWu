var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    pass: String,
    email: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);