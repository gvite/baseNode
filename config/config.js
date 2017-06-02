/**
 * Created by @josleugim on 5/19/15.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../');

module.exports = {
    development: {
        rootPath: rootPath,
        pathResources: "http://localhost:5000",
        port: process.env.PORT || 5000,
        'secret': '$TimSpftWA.15',
        'database': 'mongodb://localhost/db',
        rateLimits: {
            ttl: 10 * 60 * 1000, //10 minutes
            maxHits: 1200 // Max Hits
        },
        ROLE_ADMIN:"admin"
    },
    production: {
        rootPath: rootPath,
        pathResources: "https://proyecto.com",
        port: process.env.PORT || 5001,
        'secret': 'TimqpftNA.15$',
        'database': 'mongodb://localhost/db',
        rateLimits: {
            ttl: 10 * 60 * 1000, //10 minutes
            maxHits: 1200 // Max Hits
        },
        ROLE_ADMIN:"admin"
    }
};