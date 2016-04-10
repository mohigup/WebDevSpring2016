"use strict";

/*var mock = require("./form.mock.json");*/
// load q library
var q = require("q")

module.exports = function(db,mongoose ) {

    // load form schema
    var IssueSchema = require("./issues.schema.server.js")(mongoose);
    //console.log("UserSchema is "+UserSchema)

    // create form model from schema
    var IssueModel = mongoose.model("Issue", IssueSchema);


    var api = {
        getIssues:getIssues,
        createIssue:createIssue,
        updateIssueById:updateIssueById,
        deleteIssueById:deleteIssueById
    }

    return api;

    function createIssue(issue){

        console.log("server side model - ")
        /*   form._id =  uuid.v1();//(new Date).getTime();
         console.log("form pushed is ")
         console.log(form)
         mock.push(form);
         console.log("updated forms are")
         console.log(mock)*/

        var deferred = q.defer();
        console.log("form received")
        console.log(issue)
        IssueModel.create(issue, function(err, doc){
            if(err){
                console.log("error")
                console.log(err)
                deferred.reject();
            }else{
                console.log("success")
                console.log(doc)
                console.log(doc)
                console.log("----------------ending create issue call to DB-----------")
                deferred.resolve(doc);
            }
        });
        console.log("---------------------------------")
        return deferred.promise;


        // return(findAllFormsForUser(form.userId));
    }

    function getIssues(){
        var deferred = q.defer();
        IssueModel.find(function(err, doc){
            if(err){

                console.log(" ERROR FOUND")
                console.log(err)
                console.log("----------------ending get issues call to DB-----------")
                deferred.reject();
            }else{
                console.log(" ISSUES FOUND")
                console.log(doc)
                console.log("----------------ending get issues call to DB-----------")
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }




    function deleteIssueById(issueId){
        console.log("Inside deleteFormById on server MODEL JS");
        console.log("form ID to delete is")
        console.log(issueId)
        var deferred = q.defer();
        IssueModel.remove(
            {_id: issueId},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            });
        console.log("---------------------------------")
        return deferred.promise;

        // return(mock);
    }

    function updateIssueById(issueId, newIssue){
        console.log("Inside updateFormById on server MODEL");
        var deferred = q.defer();
        IssueModel.update(
            {_id: issueId},
            {$set: newIssue},
            function(err, stats){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(stats);
                }
            });
        console.log("---------------------------------")
        return deferred.promise;

        //return(mock);
    }


}