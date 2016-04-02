"use strict";

/*var mock = require("./form.mock.json");*/
// load q library
var q = require("q")

module.exports = function(db,mongoose ) {

    // load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);
    //console.log("UserSchema is "+UserSchema)

    // create form model from schema
    var FormModel = mongoose.model("Form", FormSchema);


    var api = { createForm:createForm,
        findAll:findAll,
        findFormById:findFormById,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findFormByTitle:findFormByTitle
    }

    return api;

    function createForm(form){

    console.log("server side model - ")
     /*   form._id =  uuid.v1();//(new Date).getTime();
        console.log("form pushed is ")
        console.log(form)
        mock.push(form);
        console.log("updated forms are")
        console.log(mock)*/

        var deferred = q.defer();
        console.log("form received")
        console.log(form)
        FormModel.create(form, function(err, doc){
            if(err){
                console.log("error")
                console.log(err)
                deferred.reject();
            }else{
                console.log("success")
                console.log(doc)
                deferred.resolve(doc);
            }
        });
        console.log("---------------------------------")
        return deferred.promise;


       // return(findAllFormsForUser(form.userId));
    }

    function findAll(){
        var deferred = q.defer();
        FormModel.find(function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findById(formId, function(err, doc){
            if(err){
                deferred.reject();
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId){
        console.log("inside findAllFormsForUser on server MODEL JS");
     /*   console.log("user ID is ");
        console.log(userId);
        console.log("All forms in JSON are ");
        console.log(mock)
       // console.log(mock[0].userId)
        var userForms = [];
        for(var u in mock) {
            if (mock[u].userId == userId) {
                userForms.push(mock[u]);
            }
        }*/

        var deferred = q.defer();
        FormModel.find(
            {userId: userId},
            function(err, doc){
                if(err){
                    deferred.reject();
                }else{
                    console.log("forms to display for current user")

                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        console.log("waht is formModel")
        console.log(FormModel)
        console.log("END of inside findAllFormsForUser on server MODEL JS");
        console.log("---------------------------------")

        return deferred.promise;


    }

    function deleteFormById(formId){
        console.log("Inside deleteFormById on server MODEL JS");
        console.log("form ID to delete is")
        console.log(formId)
        var deferred = q.defer();
        FormModel.remove(
            {_id: formId},
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

    function updateFormById(formId, newForm){
        console.log("Inside updateFormById on server MODEL");
        var deferred = q.defer();
        FormModel.update(
            {_id: formId},
            {$set: newForm},
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

    function findFormByTitle(title){
        var deferred = q.defer();
        FormModel.findOne(
            {title: title},
            function(err, doc){
                if(err){
                    deferred.reject();
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
}