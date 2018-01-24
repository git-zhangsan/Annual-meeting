let $User = require('../models/index').User;

exports.get = function* (openid) {
  let url = this.request.url,
      res = parseQueryString(url);
  let user = yield $User.getUserByOpenId(res.openid);
  if(user){
    this.response.body = {
      errorcode:"0",
      result:user
    }
  }else{
    this.response.body = {
      errorcode:"-1",
      errormsg:"该用户不存在"
    }
  }
};

function parseQueryString(url) {
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1],
      result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    };
  };
  return ret;
}
