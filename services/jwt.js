'use strict'

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require("../config/config")[env];

//Verify the token more information at: https://github.com/auth0/node-jsonwebtoken
exports.validate = function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['auth-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret,
            function(err, decoded) {
                if (err) {
                    console.log('Verifying token: ' + err);
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    next();
                }
            });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};
exports.isAdmin = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    var payload = jwt.decode(token, {complete: true});
    if(payload.rol === config.ROLE_ADMIN) {
        next();
    } else {
        res.status(401).json({success: false, message: "Unauthorized"});
        res.end();
    }
};