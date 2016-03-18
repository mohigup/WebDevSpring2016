"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);


    function FormService($http) {
      /*  var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];*/

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return api;

        function createFormForUser(userId, form) {
          /*  form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);*/
            console.log("client service for add form- receiving formname and  user ID");
            console.log(userId)
            console.log(form)
            //return $http.post("/api/assignment/user/";
            return $http({
                method: 'POST',
                url: '/api/assignment/user/' + userId + '/form',
                data: form
            });
        }

        function findAllFormsForUser(userId) {
           /* var allForms = [];

            for (var i in forms) {
                if (forms[i].userId == userId) {
                    allForms.push(forms[i]);
                }
            }*/
            console.log(userId);
            return $http.get("/api/assignment/user/" +userId+ "/form");
           // callback(allForms);
        }

        function deleteFormById(formId) {
         /*   for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }*/
            console.log("Inside deleteFormById Client Controller")

            console.log("--------------------------------------------")
            return $http.delete("/api/assignment/form/" +formId);
            //callback(forms);
        }

        function updateFormById(formId, newForm) {
         /*   for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms[i].userId = newForm.userId;
                    forms[i].title = newForm.title;
                    callback(forms[i]);
                    break;
                }
            }*/
            console.log("Inside updateFormById Client Controller (calling post)")

            console.log("--------------------------------------------")

            return $http.put("/api/assignment/form/" +formId, newForm);
        }

        function findFormById(formId){
            return $http.get("/api/assignment/form/" +formId);
        }

    }
})();