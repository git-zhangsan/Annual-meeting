let $User = require('../models/index').User;
var fs = require('fs');

exports.get = function* (){
  this.response.body = {
    errorcode:0
  }
}
exports.post = function* () {
    let data = this.request.body,
        image_base =  data.picture;
    if(image_base){
      let path = 'view/publices/images/'+ Date.now() +'.png'
      yield saveImage(path,image_base);
      data.picture = 'http://47.95.157.114:3000' + path.replace("view/publices", "");
    }
    data.updated_at = new Date(Date.now() + (8 * 60 * 60 * 1000));
    yield $User.findAndUpdate({name:data.name},data);
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
         console.log('写入成功！');
      }
  });
}
