"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;

    app.post("/api/assignment/user", auth, createUser);
    /*app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user", findUserByUsername);*/
    // ADDING FOR SESSION
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin", loggedin);
    app.get('/api/assignment/login' , passport.authenticate('local'), login);
    app.get("/api/assignment/user/:id", auth, findUserById);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/username", findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    // PASSPORT CONFIG
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    console.log("local Strategy")
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("serializeUser ")
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    console.log("deserializeUser no error ")
                    done(null, user);
                },
                function(err){
                    console.log("deserializeUser error ")
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var usrObj = req.body;
        userModel.createUser(usrObj)
            .then(
                function(doc){
                    // ADDING FOR SESSION
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );


        /*userModel
            .createUser(usrObj)
            .$promise.then(function (users) {
                res.json(users);
            });*/

       // res.json(userModel.createUser(usrObj));
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function(docs){
                    res.json(docs);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        //res.json(userModel.findUserById(userId));

    }

    function findUserByUsername(req, res) {
        console.log("on server services, findUserByUsername")

        var userUsername = req.query.username;
        console.log(userUsername)
        userModel.findUserByUsername(userUsername)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

   /* function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.query.username, "password": req.query.password};

       /!* userModel
            .findUserByUsername(userCredentials)
            .then(function (user) {
                res.json(user);
            });*!/
        console.log("on server, validating credentails")
        userModel.findUserByCredentials(userCredentials)
            .then(
                function(doc){
                    // ADDING FOR SESSION
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }*/

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        console.log("updated obj received on server")

        userModel.updateUserById(userId, userObj)
            .then(
                function(stats){
                    return userModel.findUserById(userId);
                    //res.send(200);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    console.log(user);
                    // ADDING FOR SESSION
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel.deleteUserById(userId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        // res.json(userModel.deleteUserById(userId));
    }
        // ADDING FOR SESSION
       /* function loggedin(req, res) {
                    res.json(req.session.currentUser);
                }*/
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
        // ADDING FOR SESSION
        /*function logout(req, res) {
                        req.session.destroy();
                        res.send(200);
                    }*/

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


};