"use strict";
(function () {
    angular
        .module("GitApp")
        .factory("FormService", FormService);


    function FormService($http) {
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
            findAllForms: findAllForms,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return api;

        function createFormForUser(form) {
            console.log("createFormForUser Service");

            console.log("form to be added");
            console.log(form);
       /*     issues_tracker.push(form);
            callback(form);*/


            //return $http.post("/api/assignment/user/";
            return $http({
                method: 'POST',
                url: '/api/admin/form',
                data: form
            });
        }

        function findAllForms() {
        /* var allForms = [];

            for (var i in issues_tracker) {

                    allForms.push(issues_tracker[i]);

            }*/
            //return $http.get("/api/admin/form");
            console.log("all forms")
            //  console.log(allForms);
            return $http.get("/api/admin/form");
        }

        function deleteFormById(formId, callback) {
            console.log("Inside deleteFormById Client Controller")

            console.log("--------------------------------------------")
            return $http.delete("/api/admin/form/" +formId);
        }

        function updateFormById(issueId, newIssue) {
            console.log("Inside updateFormById Client Controller (calling post)")
            console.log("issueid");
            console.log(issueId);
            console.log("--------------------------------------------")

            return $http.put("/api/admin/form/" +issueId, newIssue);
        }

    }
})();