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
          Entity.findByIdAndUpdate(req.params.id, {friends: user.friends}, {multi: false}, function (err, numberAffected, raw) {
            if (err) return next(err);
            res.json(createResponse(true, null, null));
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

function createResponse(success, code, msg) {
  return {success: success, code: code, msg: msg};
}

module.exports = router;