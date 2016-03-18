"use strict";

module.exports = function(app, formModel) {


    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);

    function createForm(req, res) {
        var formObj = req.body;
        formModel
            .createForm(formObj)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function createFormByUserId(req, res) {
        var userId = req.params.userId;
        var formObj = req.body;
        formObj.userId = userId;

        formModel
            .createUser(formObj)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function findAllForms(req, res) {
        formModel
            .findAllForms()
            .then(function (forms) {
                res.json(forms);
            });
    }

    function findFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findFormsByUserId(userId)
            .then(function (userForms) {
                res.json(userForms);
            });
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(function (form) {
                res.json(form);
            });
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .updateFormById(formId)
            .then(function (forms) {
                res.json(forms);
            });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(function (forms) {
                res.json(forms);
            });
    }
}