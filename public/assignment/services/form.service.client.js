"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);


    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return api;

        function createFormForUser(userId, form, callback) {
            form._id = (new Date).getTime();
            form.userId = userId;
            forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var allForms = [];

            for (var i in forms) {
                if (forms[i].userId == userId) {
                    allForms.push(forms[i]);
                }
            }
            callback(allForms);
        }

        function deleteFormById(formId, callback) {
            for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms.splice(i, 1);
                    break;
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for (var i in forms) {
                if (forms[i]._id == formId) {
                    forms[i].userId = newForm.userId;
                    forms[i].title = newForm.title;
                    callback(forms[i]);
                    break;
                }
            }
        }

    }
})();