var qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '9g8ftmtOyy4cSWymIAzsG2y3QDtgpvB5PXwVZPDY';
qiniu.conf.SECRET_KEY = 'UHQMfXIMwBQAkykO3gwtCn7dnaJWCpUfqKgnlmFl';

//要上传的空间
bucket = 'test';

//构造上传函数
exports.uploadFile = function(key, localFile, callback) {
    var token = new qiniu.rs.PutPolicy(bucket + ":" + key).token();
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
        // if (!err) {
        // 上传成功， 处理返回值
        // console.log(ret.hash, ret.key, ret.persistentId);
        callback(err, ret);
        // } else {
        // 上传失败， 处理返回代码
        // console.log(err);
        // }
    });
};