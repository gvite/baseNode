/**
 * Created by @josleugim on 5/4/15.
 */

// Express web framework, more information: http://expressjs.com/
// Instance of express
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Environment setup
var app = express();

// get our config file
var config = require('./config/config')[env];

require('./config/express')(app, config);
require('./config/mongoose')(config);

//var Throttle = require('./services/throttle');
//app.enable('trust proxy')

// Environment setup
app.listen(config.port, function () {
    console.log('Gulp is running my app on PORT: ' + config.port)
})