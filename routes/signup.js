let $User = require('../models/index').User;
let validator = require('validator');
var fs = require('fs');
exports.get = function* () {
  yield this.render('signup');
};

exports.post = function* () {
    let data = this.request.body,
        image_base = data.picture;

    if(image_base.match(/^data:image\/\w+;base64,/)){
        let path = 'view/publices/images/'+ Date.now() +'.png';
        data.picture = path.replace("view/publices", "");
        yield saveImage(path,image_base);
    }



    let userExist = yield $User.getUserByOpenId(data.open_id);
    if (userExist) {
      data.updated_at = new Date(Date.now() + (8 * 60 * 60 * 1000));
      yield $User.findAndUpdate({open_id:data.open_id},data);
    }else{
      yield $User.addUser(data);
    }

    this.response.body = {
      errorcode:0
    }

};

var saveImage = function* (path,data){

  var base64 = data.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64, 'base64');
  fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
      if(err){
          console.log(err);
      }else{
         console.log('照片上传成功');
      }
  });
}
