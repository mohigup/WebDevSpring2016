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
        addUserSearchById:addUserSearchById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(user) {
        /*   user._id = uuid.v1();//(new Date).getTime();
         users.push(user);
         return user;*/
        console.log("on server model, creating user")
        console.log(user)
        var deferred = q.defer();
        UserModel.create(user, function (err, doc) {
            if(err){
                console.log(err)
                deferred.reject(err);
            }else{
                console.log(doc)
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

        var deferred = q.defer();
        UserModel.findOne(
            {username: username},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    console.log("user found")
                    console.log(doc)
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
        console.log("user before")
        console.log(user);
        delete user._id;
        var deferred = q.defer();
        console.log("user after")
        console.log(user)
        UserModel.update(
            {_id: userId},
           {$set: user}
            /*{username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            recent_repoowner:user.recent_repoowner,
            recent_reponame:user.recent_reponame,
            recent_commits:user.recent_commits,
            searchhistory:user.searchhistory}*/,
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

    function addUserSearchById(userId, user) {

        console.log("on server model, updateUserById")

        var deferred = q.defer();
        console.log(userId);
        console.log(user);
        var reponame =user.recent_reponame;
        var owner = user.recent_repoowner;
        console.log("inside add new service ")
        UserModel.update(
            {_id: userId},
            { $addToSet: { searchhistory:  [{ repo: reponame, owner : owner }] } },
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