'user strict'
var express = require('express');
var routes = function (jwtSecret) {
    
    var loginRouter = express.Router();
    var loginController = require('../controllers/login')(jwtSecret);
    console.log("entra router")
    loginRouter.route('/')
        .post(loginController.login);
    return loginRouter;
}

module.exports = routes;