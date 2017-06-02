'use strict'
/**
 * Created by @gflores
 */

var User = require('../models/user');

var userController = function (jwtSecret) {
    var get = function (req, res) {
        User.find({}, function (err, users) {
            res.status(200).json(users);
        });
    };

    //expose functions
    return {
        get: get
    }
}

module.exports = userController;