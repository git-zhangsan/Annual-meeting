let $User = require('../models/index').User;
exports.get = function* () {
  
  let userlist = yield $User.findAll();

  yield this.render('userlist',{
    userlist:userlist
  });
};
