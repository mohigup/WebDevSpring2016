"use strict";

module.exports = function(app, userModel) {


    app.post("/api/assignment/user", createUser);
    /*app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user", findUserByUsername);*/
    app.get('/api/assignment/user', getUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var usrObj = req.body;



        /*userModel
            .createUser(usrObj)
            .$promise.then(function (users) {
                res.json(users);
            });*/

        res.json(userModel.createUser(usrObj));
    }

    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            return findUserByCredentials(req, res);
        } else if (req.query.username) {
            return findUserByUsername(req, res);
        } else {
            return findAllUsers(req, res);
        }
    }

    function findAllUsers(req, res) {
       /* userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });*/
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        /*userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });*/
        res.json(userModel.findUserById(userId));

    }

    function findUserByUsername(req, res) {
        console.log("on server services, findUserByUsername")

        var userUsername = req.query.username;
        console.log(userUsername)
      /*  userModel
            .findUserByUsername(userUsername)
            .then(function (user) {
                res.json(user);
            });*/
        res.json(userModel.findUserByUsername(userUsername));
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.query.username, "password": req.query.password};

       /* userModel
            .findUserByUsername(userCredentials)
            .then(function (user) {
                res.json(user);
            });*/
        console.log("on server, validating credentails")
        res.json(userModel.findUserByCredentials(userCredentials));
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        console.log("updated obj received on server")
        console.log(userObj)
       /* userModel
            .updateUser(userId, userObj)
            .then(function (users) {
                res.json(users);
            });*/
        res.json(userModel.updateUserById(userId, userObj));
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
       /* userModel
            .deleteUserById(userId)
            .then(function (users) {
                res.json(users);
            });*/
        res.json(userModel.deleteUserById(userId));

    }
}