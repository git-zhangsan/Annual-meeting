let $Vote = require('../models/index').Vote;
let validator = require('validator');

exports.post = function* () {
    let data = this.request.body;
    if(validator.isIn(data.vote_type,['catwalk','program'])){
        yield $Vote.addVote(data);
        this.response.body = {
          errorcode:0
        }
    }else{
      this.response.body = {
        errorcode:"-1",
        errormsg:"The type should be an enumeration value `catwalk` or `program`"
      }
    }

};
