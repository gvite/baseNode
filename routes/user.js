'user strict'
var express = require('express');
var routes = function (jwtSecret) {
    
    var userRouter = express.Router();
    var userController = require('../controllers/user')(jwtSecret);
    console.log("entra router")
    userRouter.route('/')
        .get(userController.get);
    return userRouter;
}

module.exports = routes;