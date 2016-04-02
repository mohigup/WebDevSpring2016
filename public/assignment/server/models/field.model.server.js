    "use strict";
    // load q library
    var q = require("q")

module.exports = function (db, mongoose,formModel) {
    var api = {
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function createField(formId, field) {
       // var form;
       // field._id =new Date().getTime(); //uuid.v1();//(
        //form = formModel.findFormById(formId);
       /* console.log("push case")
        console.log(forms)*/
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    doc.fields.push(field);
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;

    }

    function deleteField(formId, fieldId) {
       /* var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                fields.splice(v, 1);
            }
        }*/
        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    doc.fields.id(fieldId).remove();
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }

    function findField(formId, fieldId) {
        /*var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                return fields[v];
            }
        }*/
    }

    function findFieldsByFormId(formId) {
       /* var form;
        console.log(formId);
        form = formModel.findFormById(formId);
        return form.fields;*/
        var deferred = q.defer();
        console.log("finding fields for current user FORM ID")
        console.log(formModel)
        formModel.findFormById(formId)
            .then(function (doc) {
                    deferred.resolve(doc);
                },
                // send error if promise rejected
                function (err) {
                    deferred.reject(err);

                });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        /*var form;
        var fields;
        form = formModel.findFormById(formId);
        fields = form.fields;
        for (var v in fields) {
            if (fields[v]._id == fieldId) {
                fields[v] = field;
            }
        }*/

        var deferred = q.defer();
        formModel.findFormById(formId)
            .then(
                function (doc) {
                    var newField = doc.fields.id(fieldId);
                    newField.label = field.label;
                    newField.placeholder = field.placeholder;
                    newField.type = field.type;
                    newField.options = field.options;
                    doc.save(function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        return deferred.promise;
    }

};