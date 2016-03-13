var express = require('express');
var router = express.Router();

var Entity = require('../models/User.js');
var mongoose = require('mongoose');

router.post('/:id', function(req, res, next) {
  Entity.findById(req.params.id, function(err, user){
    if (err) return next(err);
    if (user !== null) {
      Entity.findOneByNickname(req.body.nickname, function(err, friend){
        if (err) return next(err);
        if (friend !== null) {
          user.friends.addToSet(mongoose.Types.ObjectId(friend.id));
          Entity.findByIdAndUpdate(user.id, {friends: user.friends}, {multi: false}, function (err) {
            if (err) return next(err);

            friend.friends.addToSet(mongoose.Types.ObjectId(user.id));
            Entity.findByIdAndUpdate(friend.id, {friends: friend.friends}, {multi: false}, function (err) {
              if (err) return next(err);
              res.json(createResponse(true, null, null));
            });
          });
        } else {
          res.json(createResponse(false, 2, null));
        }
      });

    } else {
      res.json(createResponse(false, 1, null));
    }
  });
});

router.get('/:id', function(req, res, next) {
  Entity.findById(req.params.id, function(err, user){
    if (err) return next(err);
    if (user !== null) {
      Entity.where('_id').in(user.friends).
        sort('nickname').
        select('-_id nickname').
        exec(function(err, friends){
          if (err) return next(err);
          res.json(createResponse(true, null, friends));
        });
    } else {
      res.json(createResponse(false, null, null));
    }
  });
});

function createResponse(success, code, msg) {
  return {success: success, code: code, msg: msg};
}

module.exports = router;