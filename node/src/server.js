var mongoose = require('mongoose');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://db/meetat', function(err) {
  if(err) {
    console.log('Connection error', err);
  } else {
    console.log('Connection successful');
  }
});

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var users = require('./routes/users');
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    error: err
  });
});

var server = app.listen(8080, function () {
  console.log('Listening on port 8080!');
});

var gracefulShutdown = function() {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(function() {
    console.log("Closed out remaining connections.");
    process.exit()
  });

  // if after
  setTimeout(function() {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit()
  }, 10*1000);
}

// listen for TERM signal .e.g. kill
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);

module.exports = app;
