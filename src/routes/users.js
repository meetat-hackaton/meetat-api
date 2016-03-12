var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.get('/', function(req, res, next) {
    User.find(function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router;