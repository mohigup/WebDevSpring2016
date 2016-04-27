/*
var mongoose = require('mongoose');*/

module.exports = function(mongoose) {

    var UserSchema = new mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String],
            recent_repoowner:String,
            recent_reponame:String,
            recent_commits:Array,
            searchhistory:[{repo:String, owner:String}]
        }, {collection: "project.user"});
    return UserSchema;
};