let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  open_id:{ type: String, required: true },
  user_id:{ type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  department:{ type: String, required: false },
  picture:{type: String, required: true},
  phone_number:{type: String, required: true},
  game_number:{type: String, required: true, default:'-'},
  theme:{type: String, required: true, default:'-'},
  is_sign:{type: String, required: true, default:'否'},
  is_lucky:{type: String, required: true, default:'否'},
  created_at: { type: Date, default: new Date(Date.now() + (8 * 60 * 60 * 1000)) },
  updated_at: { type: Date, default: new Date(Date.now() + (8 * 60 * 60 * 1000)) }
});

//UserSchema.index({open_id: 1});

let User = mongoose.model('User', UserSchema);

//新建一个用户
User.addUser = function (data) {
  console.log('addUser');
  return User.create(data);
};

//通过id获取用户
User.getUserById = function (id) {
  console.log('getUserById');
  return User.findbyId(id).exec();
};

//通过name获取用户
User.getUserByName = function (name) {
  return User.findOne({name: name}).exec();
};

//通过openId获取用户
User.getUserByOpenId = function (open_id) {
  return User.findOne({open_id: open_id}).exec();
};

//修改用户信息
User.updateUser = function(query){
  return User.update(query);
}

//查看全部用户
User.findAll = function(){
  return User.find();
}

//查找并修改用户信息
User.findAndUpdate = function(query,new_query){
  return User.findOneAndUpdate(query,new_query).exec();
}

//抽奖池
User.findLottery = function(query,new_query){
  return User.find().where('is_sign','是').where('is_lucky','否');
}


module.exports = User;
