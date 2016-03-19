"use strict";

var users = require('./user.mock.json');
var uuid = require('node-uuid');

module.exports = function () {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(user) {
        user._id = uuid.v1();//(new Date).getTime();
        users.push(user);
        return user;
    }

    function findAllUsers() {
        return users;
    }

    function findUserById(userId) {
        var userFound = null;
        for (var i = 0; users.length; i++) {
            if (users[i]._id == userId) {
                userFound = users[i];
                break;
            }
        }
        return userFound;
    }

    function findUserByUsername(username) {

        console.log("on server model, findUserByUsername")
        console.log(username)
        var userFound = null;
        for (var i in users) {
            if (users[i].username == username) {
                userFound = users[i];
                break;
            }
        }
        console.log("user found");
        console.log(userFound);
        console.log("---------------------------------")
        return userFound;
    }

    function findUserByCredentials(credentials) {
        console.log("on server model, findUserByCredentials")
        var userFound = null;
        var username = credentials.username;
        var password = credentials.password;
        for (var i in users) {
            if (users[i].username == username && users[i].password == password) {
                userFound = users[i];
                break;
            }
        }
        console.log("user found")
        console.log(userFound);
        console.log("---------------------------------")
        return userFound;
    }

    function updateUserById(userId, user) {

        console.log("on server model, updateUserById")
        console.log(users)
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i] = user;
                break;
            }
        }
        console.log("---------------------------------")
        return users;
    }

    function deleteUserById(userId) {
        for (var i = 0; users.length; i++) {
            if (users[i]._id === userId) {
                users.splice(i, 1);
                break;
            }
        }
        return users;
    }
}