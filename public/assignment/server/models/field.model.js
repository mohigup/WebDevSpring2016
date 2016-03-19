"use strict";
var forms = require("./form.mock.json");
var uuid = require('node-uuid');
module.exports = function (uuid,formModel) {
    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createField(formId, field) {
        var form;
        field._id =new Date().getTime(); //uuid.v1();//(
        form = formModel.findFormById(formId);
        console.log("push case")
        console.log(forms)
        form.fields.push(field);
    }

    function deleteField(formId, fieldId) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                fields.splice(v, 1);
            }
        }
    }

    function findField(formId, fieldId) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                return fields[v];
            }
        }
    }

    function findFieldsByFormId(formId) {
        var form;
        console.log(formId);
        form = formModel.findFormById(formId);
        return form.fields;
    }

    function updateField(formId, fieldId, field) {
        var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                fields[v] = field;
            }
        }
    }

};