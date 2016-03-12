var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nickname: String,
    phone_number: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);