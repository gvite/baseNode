/**
 * Created by @gflores on 02/06/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    encrypt = require('../services/encryption');

var userModel = new Schema({
    // the username is used to authenticate
    username: {type: String, required: '{PATH} requerido'},
    // the salt conforms the hashed_pwd
    salt: {type: String, required: '{PATH} requerido'},
    hashed_pwd: {type: String, required: '{PATH} requerido'},
    rol: {type: String},
    isActive: {type: Boolean},
    createdAt: {type: Date},
    updatedAt: {type: Date}
});

// Custom Methods
userModel.methods = {
    // For security reasons let's remove the password, isActive fields from the object
    toJSON: function () {
        var user = this.toObject();
        delete user.hashed_pwd;
        delete user.salt;
        delete user.isActive;
        return user;
    }
};

module.exports = mongoose.model('User', userModel);

// Seeds the users collection if it has no data
var User = mongoose.model('User', userModel);

var createDefaultUsers = function() {
    User.find({}).exec(function (err, collection) {
        console.log(err);
        console.log(collection);

        if (collection.length === 0) {
            var salt, hash, hashNipik;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'demo');
            User.create({username: 'gflores', salt: salt, hashed_pwd: hash, rol: "admin", isActive: true});
        }
    });
}

module.exports.createDefaultUsers = createDefaultUsers;