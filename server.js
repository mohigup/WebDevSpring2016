#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
// this section is for server side

var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');

// end of this section






// this section is for server side

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));


// end of this section



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/', function(req, res){
    res.send('hello world test 3');
});

require("./public/assignment/server/app.js")(app);

app.listen(port, ipaddress);