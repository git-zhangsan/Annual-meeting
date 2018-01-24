let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let VoteSchema = new Schema({
  vote_item:{ type: String, required: true },
  vote_type:{type: String, required: true },//枚举值 catwalk  program 
  vote_count:{type: Number, required: true, default:0},
  created_at: { type: Date, default: new Date(Date.now() + (8 * 60 * 60 * 1000)) }
});

let Vote = mongoose.model('Vote', VoteSchema);

//新建一个投票项
Vote.addVote = function (data) {
  return Vote.create(data);
};

//通过vote_type获取投票信息
Vote.getVoteByType = function (type) {
  return Vote.findOne({vote_type: type}).exec();
};

//通过投票项获取信息
Vote.getVoteByitem = function (vote_item) {
  return Vote.findOne({vote_item:vote_item}).exec();
};

//更新投票信息
Vote.findAndUpdate = function (query,new_query) {
  return Vote.findOneAndUpdate(query,new_query).exec();
};

module.exports = Vote;
