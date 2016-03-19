"use strict";

var mock = require("./form.mock.json");
var uuid = require('node-uuid');

module.exports = function( ) {

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
       /* var form = {
            _id:(new Date).getTime(),
            title:formName,
            userId:userId
        };*/
    console.log("server side model - ")
        form._id =  uuid.v1();//(new Date).getTime();
        console.log(form)
        mock.push(form);
        console.log("---------------------------------")
        return(form);
    }

    function findAll(){
        return(mock);
    }

    function findFormById(formId){
        for(var u in mock){
            if(mock[u]._id === formId){
                return mock[u];
            }
        }
        return null;
    }

    function findAllFormsForUser(userId){
        console.log("inside findAllFormsForUser on server MODEL JS");
        console.log("user ID is ");
        console.log(userId);
        console.log("All forms in JSON are ");
        console.log(mock)
       // console.log(mock[0].userId)
        var userForms = [];
        for(var u in mock) {
            if (mock[u].userId == userId) {
                userForms.push(mock[u]);
            }
        }

        console.log("forms to display for current user")

        console.log(userForms);

        console.log("END of inside findAllFormsForUser on server MODEL JS");
        console.log("---------------------------------")
        return(userForms);
    }

    function deleteFormById(formId){
        console.log("Inside deleteFormById on server MODEL JS");
        console.log("form ID to delete is")
        console.log(formId)
        for(var u in mock) {
            console.log("inside loop to delete form")
            console.log("comparing "+mock[u]._id + " with "+formId)
            if (mock[u]._id == formId) {
                console.log("form to delete is ")
                console.log(mock[u]._id)
                mock.splice(u, 1);
                break;
            }
        }
        console.log("---------------------------------")
        return(mock);
    }

    function updateFormById(formId, newForm){
        console.log("Inside updateFormById on server MODEL");
        for(var u in mock) {
            if (mock[u]._id === formId) {
                mock[u] = newForm;
                break;
            }
        }
        console.log("---------------------------------")
        return(mock[u]);
    }

    function findFormByTitle(title){
        for(var u in mock){
            if(mock[u].title === title){
                return(mock[u]);
            }
        }
        return null;
    }
}