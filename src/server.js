var mongoose = require('mongoose');
mongoose.connect('mongodb://db/meetat', function(err) {
  if(err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var express = require('express');
var app = express();

var users = require('./routes/users');
app.use('/users', users);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

