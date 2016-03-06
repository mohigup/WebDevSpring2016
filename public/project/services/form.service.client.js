"use strict";
(function () {
    angular
        .module("GitApp")
        .factory("FormService", FormService);


    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var issues_tracker = [
            {"u_id": "000","status": "New", "title": "Broken Map", "desc": " failed to see commits for my repo in map","Reported_On": new Date(2015,1,1), "email_id":"alice@gmail.com"},
            {"u_id": "010","status": "Hold", "title": "Authentication Failure", "desc": " failed to login throught git on GitViz","Reported_On": new Date(2015,1,4), "email_id":"john@gmail.com"},
            {"u_id": "020","status": "Resolved", "title": "Unclickable slides", "desc": "unable to navigate slides for new repo","Reported_On": new Date(2015,1,19), "email_id":"malice@gmail.com"},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return api;

        function createFormForUser(userId, form, callback) {
            console.log("createFormForUser Service");
            console.log(issues_tracker);
            console.log("form to be added");
            console.log(form);
            issues_tracker.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
         var allForms = [];

            for (var i in issues_tracker) {

                    allForms.push(issues_tracker[i]);

            }

            console.log(allForms);
            callback(allForms);
        }

        function deleteFormById(formId, callback) {
            console.log("delte forms form id is "+formId)
            for (var i in issues_tracker) {
                console.log("delte forms fro loop")
                if (issues_tracker[i].u_id == formId) {
                    console.log(i);
                    issues_tracker.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in issues_tracker) {
                if (issues_tracker[i].u_id == formId) {
                    issues_tracker[i].status = newForm.status;
                    issues_tracker[i].desc = newForm.desc;
                    issues_tracker[i].Reported_On = newForm.Reported_On;
                    issues_tracker[i].email_id = newForm.email_id;
                    callback(issues_tracker[i]);
                    break;
                }
            }
        }

    }
})();