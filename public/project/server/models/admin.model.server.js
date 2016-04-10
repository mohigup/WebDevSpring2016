"use strict";

// load q library
var q = require("q");

/*var users = require('./user.mock.json');*/


module.exports = function (db,mongoose) {

    // load user schema
    var AdminSchema = require("./admin.schema.server.js")(mongoose);
    //console.log("UserSchema is "+UserSchema)

    // create user model from schema
    var UserModel = mongoose.model("Admin", AdminSchema);
    // console.log("UserModel is "+UserModel)

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
        /*   user._id = uuid.v1();//(new Date).getTime();
         users.push(user);
         return user;*/

        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            function(err, docs){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;
    }

    function findUserById(userId) {
        /*  var userFound = null;
         for (var i = 0; users.length; i++) {
         if (users[i]._id == userId) {
         userFound = users[i];
         break;
         }
         }
         return userFound;*/

        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {

        console.log("on server model, findUserByUsername")
        /* console.log(username)
         var userFound = null;
         for (var i in users) {
         if (users[i].username == username) {
         userFound = users[i];
         console.log(userFound);
         break;
         }
         }
         console.log("user found");
         console.log(userFound);
         return userFound;*/

        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            }
        );
        console.log("---------------------------------")
        return deferred.promise;



    }

    function findUserByCredentials(credentials) {
        console.log("on server model, findUserByCredentials")
        /*  var userFound = null;
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
         return userFound;*/
        var username = credentials.username;
        var password = credentials.password;
        console.log("username password recieved")
        console.log(username)
        console.log(password)
        var deferred = q.defer();
        UserModel.findOne(
            {username: username, password: password},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    //console.log(doc);
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;

        console.log("---------------------------------")

    }

    function updateUserById(userId, user) {

        console.log("on server model, updateUserById")
        /* console.log(users)
         for (var i in users) {
         if (users[i]._id == userId) {
         users[i] = user;
         break;
         }
         } return users;*/

        var deferred = q.defer();
        console.log(userId);
        console.log(user);
        UserModel.update(
            {_id: userId},
            {$set: user},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
        console.log("---------------------------------")

    }

    function deleteUserById(userId) {
        /*   for (var i = 0; users.length; i++) {
         if (users[i]._id === userId) {
         users.splice(i, 1);
         break;
         }
         }
         return users;*/
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            }
        );
        return deferred.promise;
    }
}