"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http) {

        var api = {
            createField: createField,
            findField: findField,
            findFieldsByForm: findFieldsByForm,
            deleteField: deleteField,
            updateField: updateField
        };

        return api;

        function createField (formId, field) {
            console.log("creating field.... field.service.client.js");
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function findField (formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function findFieldsByForm (formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

    }
})();