'use strict'
/**
 * Created by @gflores
 */
var jwt = require('jsonwebtoken'),
    moment = require('moment'),
    encrypt = require('../services/encryption');
var User = require('../models/user');

var loginController = function (jwtSecret) {
    var login = function (req, res) {
        User.findOne({username: req.body.username}, function (err, user) {
            if(err) res.status(401).json({ success: false });
            if(!user) res.status(401).json({ success: false });
            else if (user){
                if(req.body.password) {
                    if(encrypt.hashPwd(user.salt, req.body.password) === user.hashed_pwd) {
                        var expires = moment().add(2, 'minutes').valueOf();
                        var token = jwt.sign(
                            {
                                // Payload
                                iss: user.rol,
                                expiresIn: expires
                            },
                            // secretOrPrivateKey
                            jwtSecret,
                            {
                                // Options, expires in 1 hour
                                expiresIn: '1h'
                            });
                        res.status(200).json({
                            token: token,
                            user: user,
                            success: true
                        });
                    } else {
                        res.status(401).json({ success: false })
                    }
                } else {
                    res.status(401).json({ success: false })
                }
            }
        });
    };
    var logout = function(req,res){
        res.status(200).json({success:true});
    }

    //expose functions
    return {
        login: login,
        logout: logout
    }
}

module.exports = loginController;