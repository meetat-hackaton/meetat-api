var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectID;

var UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  friends: {
    type: [ObjectId],
    default: []
  },
  created_at: { type: Date, default: Date.now }
});
UserSchema.statics.findOneByEmail = function (email, cb) {
  return this.findOne({email: new RegExp(email, 'i')}, cb);
};
UserSchema.statics.findOneByNickname = function (nickname, cb) {
  return this.findOne({nickname: new RegExp(nickname, 'i')}, cb);
};

module.exports = mongoose.model('User', UserSchema);