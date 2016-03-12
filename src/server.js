var mongoose = require('mongoose');
mongoose.connect('mongodb://db/meetat', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});
var UserSchema = new mongoose.Schema({
  nickname: String,
  phone_number: String,
  created_at: { type: Date, default: Date.now },
});
var User = mongoose.model('User', UserSchema);


var express = require('express');
var app = express();

app.post('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

