"use strict";
(function () {
    angular
        .module("GitApp")
        .factory("FormService", FormService);


    function FormService($http) {


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