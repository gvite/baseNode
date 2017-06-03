'use strict'

module.exports = function (config) {
    var mongoose = require('mongoose'),
        userModel = require('../models/user');
    mongoose.connect(config.database);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('API db opened');
        userModel.createDefaultUsers();
    });
};