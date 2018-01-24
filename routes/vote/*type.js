let $Vote = require('../../models/index').Vote;

exports.get = function* (type) {
  let vote = yield $Vote.getVoteByType(type);
  if(vote){
    this.response.body = {
      errorcode:"0",
      result:vote
    }
  }else{
    this.response.body = {
      errorcode:"-1",
      errormsg:"The type should be an enumeration value `catwalk` or `program`"
    }
  }
};

exports.post = function* () {
    let data = this.request.body,
        vote_item = data.vote_item;
    let _vote= yield $Vote.getVoteByitem(vote_item);
    yield $Vote.findAndUpdate({vote_item:vote_item},{vote_count:_vote.vote_count++});
    this.response.body = {
      errorcode:0
    }
};
