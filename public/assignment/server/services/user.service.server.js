"use strict";

module.exports = function(app, userModel) {


    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var usrObj = req.body;



        userModel
            .createUser(usrObj)
            .then(function (users) {
                res.json(users);
            });
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        var userUsername = req.params.username;
        userModel
            .findUserByUsername(userUsername)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByCredentials(req, res) {
        var userCredentials = {"username": req.params.username, "password": req.params.password};
        userModel
            .findUserByUsername(userCredentials)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var userObj = req.body;
        userModel
            .updateUser(userId, userObj)
            .then(function (users) {
                res.json(users);
            });
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        userModel
            .deleteUserById(userId)
            .then(function (users) {
                res.json(users);
            });
    }
}