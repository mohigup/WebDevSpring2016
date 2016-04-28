"use strict";

var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt          = require("bcrypt-nodejs");

module.exports = function(app, adminModel) {


    var auth = authorized;
    console.log("server admin")
    app.post("/api/admin/login",   passport.authenticate('local'), login);
    app.post("/api/admin/register", createUser);
    app.get("/api/admin/loggedin",    loggedin);
    app.post("/api/admin/logout", logout);
    app.get("/api/admin/user/:id",auth, findUserById);
    app.put("/api/admin/user/:id",auth, updateUserById);
    app.put("/api/admin/add/:id",auth, addUserSearchById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {

        adminModel.findUserByUsername(username)
            /*.findUserByCredentials({username: username, password: password})*/
           /* .then(
                function(user){
                    console.log("user"+user)
                    console.log("server findUserByUsername")

                    console.log("----------------------------------")
                    if(user){
                        console.log("server findUserByUsername success")
                        return done(null, user);
                    }else{
                        console.log("server findUserByUsername failure")
                        return done(null, false);
                    }
                },
                function(err){
                    if (err) { console.log("server findUserByUsername last failure")
                        return done(err); }
                }
            )*/
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
                        //console.log(user.password);
                        console.log("chk status  ")
                       // console.log(bcrypt.compareSync(password, user.password))
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
        done(null, user);
    }

    function deserializeUser(user, done) {
        adminModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function createUser(req, res) {
        var usrObj = req.body;
        usrObj.roles = ["guest"];
        usrObj.searchhistory =[];
        usrObj.recent_repoowner=null;
        usrObj.recent_reponame=null;
        usrObj.recent_commits=[];
        console.log("inside create user")
        console.log(usrObj.username);
        adminModel.findUserByUsername(usrObj.username)
            .then(
                function (user) {
                    if (user!=null) {
                        console.log("username exists serrvices on server")
                        res.json(null);
                    }
                    else {
                        //bycrypt
                        usrObj.password = bcrypt.hashSync(usrObj.password);
                        console.log("entering db")
                        return adminModel.createUser(usrObj);
                    }
                },
                function (err) {
                    console.log("neither db nor found")
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                console.log("login failed after register")
                                res.status(400).send(err);
                            }
                            else {
                                console.log("login passed after register")
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    console.log("login passed after register entiehr failed or paxssed")
                    res.status(400).send(err);
                });

    }

    function login(req, res) {
        console.log("server MAIN LOGIN")
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function findAllUsers(req, res) {

        adminModel.findAllUsers()
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

        adminModel.findUserById(userId)
            .then(
                function(doc){
                    res.json(user);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findUserByUsername(req, res) {
        console.log("on server services, findUserByUsername")

        var userUsername = req.query.username;
        console.log(userUsername)

        console.log(userUsername)
        adminModel.findUserByUsername(userUsername)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.query.username, "password": req.query.password};

        console.log("on server, validating credentails")
        console.log("on server, validating credentails")
        adminModel.findUserByCredentials(userCredentials)
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
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        //userObj.password = bcrypt.hashSync(userObj.password);
        if(userObj.password) {
            userObj.password = bcrypt.hashSync(userObj.password);
        }

        /*else{
            userObj.password = req.user.password;
        }
*/

        console.log("updated obj received on server")
        console.log(userObj)

        adminModel.updateUserById(userId, userObj)
            .then(
                function(stats){
                    return adminModel.findUserById(userId);
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

    function addUserSearchById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        //userObj.password = bcrypt.hashSync(userObj.password);
        console.log("updated obj received on server")
        console.log(userObj)

        adminModel.addUserSearchById(userId, userObj)
            .then(
                function(stats){
                    return adminModel.findUserById(userId);
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

    function logout(req, res){
        req.session.destroy();
        res.send(200);
    }
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

}