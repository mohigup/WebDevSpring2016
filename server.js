#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();

// this section is for server side

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport')
var cookieParser    = require('cookie-parser');
var session         = require('express-session');

// install and require the mongoose library
var mongoose      = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdevspring2016';
// end of this section

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

// this section is for server side

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret:'1234567890QWERTY',
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));


// end of this section

// top level on server  reference to app , db, mongoose
require("./public/assignment/server/app.js")(app, db, mongoose);
//require("./public/project/server/app.js")(app, db,mongoose);

// listens for incoming connections
app.listen(port, ipaddress);