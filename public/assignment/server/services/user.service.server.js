"use strict";

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {
    var auth = authorized;
    console.log("reached user service on server")
    app.get('/api/assignment/login' , passport.authenticate('local'), login);
    app.post("/api/assignment/register", createUser);
    // ADDING FOR SESSION
    app.post("/api/assignment/user/logout", logout);
    app.get("/api/assignment/user/loggedin", loggedin);

    app.get("/api/assignment/user/:id",  auth, findUserById);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/username", findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    // PASSPORT CONFIG
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username)
              /*  .findUserByCredentials({username: username, password: password})
                .then(
                    function(user) {
                        console.log("local Strategy 1")
                        //console.log(+req.isAuthenticated())
                        if (!user) {
                            console.log("local Strategy 2")
                            //console.log(+req.isAuthenticated())
                            return done(null, false); }
                        return done(null, user);
                    },
                    function(err) {
                        console.log("local Strategy 3")
                        //console.log(+req.isAuthenticated())
                        if (err) { return done(err); }
                    }
                );*/
            .then(
                function(user) {
                    console.log("usernma entered is"+username);
                    console.log("passowrd is"+password);
                    // if the user exists, compare passwords with bcrypt.compareSync
                    console.log("User Found ....");
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("User Authenticated For Assignment....")
                        return done(null, user);
                    } else {
                        console.log("User Authenticated For Assignment failed...."+user)
                        console.log("original pass")
                        console.log(user.password);
                        console.log("chk status  ")
                        console.log(bcrypt.compareSync(password, user.password))
                        return done(null, false);
                    }
                },
                function(err) {
                    console.log("User Authenticated Failed passing");
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("serializeUser running  ")
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    console.log("deserializeUser passed ")
                    done(null, user);
                },
                function(err){
                    console.log("deserializeUser failed ")
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var usrObj = req.body;
        usrObj.roles = ["student"];
       /* userModel.createUser(usrObj)
            .then(
                function(doc){
                    // ADDING FOR SESSION
                    console.log("user registeredddddd")
                    req.session.currentUser = doc;

                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );*/
        console.log("inside create user")
        userModel.findUserByUsername(usrObj.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    }
                    else {
                        usrObj.password = bcrypt.hashSync(usrObj.password);
                        return userModel.createUser(usrObj);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });




        /*userModel
            .createUser(usrObj)
            .$promise.then(function (users) {
                res.json(users);
            });*/

       // res.json(userModel.createUser(usrObj));
    }

    function login(req, res) {
        console.log("login passed")
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
        if(userObj.password) {
            userObj.password = bcrypt.hashSync(userObj.password);
        }
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
        console.log("inside loggedin req.isAuthenticated() "+req.isAuthenticated() )
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
            console.log(" inside authorized req.isAuthenticated()"+req.isAuthenticated())
            res.send(401);
        } else {
            console.log("inside authorized else condition "+req.isAuthenticated())
            next();
        }
    };


};