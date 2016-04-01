#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
// this section is for server side

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

// end of this section






// this section is for server side

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret:'1234567890QWERTY' }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


// end of this section

// install and require the mongoose library
var mongoose      = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);




var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/', function(req, res){
    res.send('hello world test 3');
});

/*require("./public/assignment/server/app.js")(app);*/
require("./public/assignment/server/app.js")(app, db, mongoose);

require("./public/project/server/app.js")(app);

app.listen(port, ipaddress);