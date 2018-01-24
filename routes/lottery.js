let $User = require('../models/index').User;
exports.get = function* () {

  let lotterylist = yield $User.findLottery();

  console.dir(lotterylist);
  yield this.render('lottery',{
    lotterylist:lotterylist
  });
};
