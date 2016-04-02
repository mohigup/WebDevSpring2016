
"use strict";
module.exports = function(app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", fieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addFieldToForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function fieldsForFormId(req, res) {
        var formId;
       // var fields;
        formId = req.params.formId;
        /*fields = fieldModel.findFieldsByFormId(formId);
        res.json(fields);*/
        fieldModel.findFieldsByFormId(formId)
            .then(
                function ( doc ) {
                    res.json(doc.fields);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getFieldById(req, res) {
       /* var formId;
        var fieldId;
        var field;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        field = fieldModel.findField(formId, fieldId);
        res.json(field);*/
    }

    function deleteFieldById(req, res) {
        var formId;
        var fieldId;
        formId = req.params.formId;
        fieldId = req.params.fieldId;
        /*fieldModel.deleteField(formId, fieldId);
        res.send(200);*/
        fieldModel.deleteField(formId, fieldId)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addFieldToForm(req, res) {
        var field;
        var formId;
        field = req.body;
        formId = req.params.formId;
       /* field = fieldModel.createField(formId, field);
        res.json(field);*/
        fieldModel.createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }

            );
    }

    function updateFieldById(req, res) {
        var fieldId;
        var formId;
        var field;
        var r;
        field = req.body;
        fieldId = req.params.fieldId;
        formId = req.params.formId;
       /* r = fieldModel.updateField(formId, fieldId, field);
        res.json(r);*/
        fieldModel.updateField(formId, fieldId, field)
            .then(
                function (doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};