/**
 * Created by @josleugim on 1/15/16.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    apicache = require('apicache').options({debug: true, enabled: false}).middleware,
    jwt = require('../services/jwt');
// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, x-csrf-token');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

module.exports = function (app, config) {
    //Using body-parser more information: https://github.com/expressjs/body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    // configure static folder
    app.use(express.static(config.rootPath + 'static'));
    app.use(allowCrossDomain);
    // YOUR_SECRET_STRING
    app.set('jwtTokenSecret', config.secret);

    // Routes, using injection to pass the model
    loginRouter = require('../routes/login')(config.secret);
    app.use('/api/login', loginRouter);

    userRouter = require('../routes/user')(config.secret);
    app.use('/api/user',jwt.validate, userRouter);

    app.use('/', function (req, res) {
        res.send('Welcom API Generic!');
    });
};