var express = require('express');
var router = express.Router();

var Entity = require('../models/User.js');

router.post('/', function(req, res, next) {
  validation(req.body,
    function(user) {
      create(user, res);
    },
    function(code) {
      res.json(createResponse(false, code, null));
  });

  function validation(user, success, fail) {
    Entity.findOneByEmail(user.email, function(err, result) {
      if (result === null) {
        Entity.findOneByNickname(user.nickname, function (err, result) {
          if (result === null) {
            success(user);
          } else {
            fail(2);
          }
        });
      } else {
        fail(1);
      }
    });
  }

  function create(user, res) {
    Entity.create(user, function (err, post) {
      if (err) {
        if (err.name === 'ValidationError') {
          res.json(createResponse(false, 3, err));
        } else {
          return next(err);
        }
      } else {
        res.json(createResponse(true, null, post._id));
      }
    });
  }
});

router.post('/auth', function(req, res, next) {
  Entity.findOneByEmail(req.body.email, function (err, user) {
    if (err) return next(err);

    process(user, res);
  });

  function process(user, res) {
    if (validate(user)) {
      res.json(createResponse(true, null, user._id));
    } else {
      res.json(createResponse(false, null, null));
    }
  }

  function validate(user) {
    return user !== null && user.password !== '' && req.body.password === user.password;
  }
});

function createResponse(success, code, msg) {
  return {success: success, code: code, msg: msg};
}

module.exports = router;