"use strict";

module.exports = function(app,formModel) {
    app.get("/api/assignment/user/:userId/form",getFormsForUser);
    app.get("/api/assignment/form/:formId",findFormById);
    app.delete("/api/assignment/form/:formId",deleteFormById);
    app.post("/api/assignment/user/:userId/form",createFormForUser);
    app.put("/api/assignment/form/:formId",updateFormById);

    function getFormsForUser(req,res){
        console.log("---------------------------------")
        console.log("Inside getFormsForUser on server JS");
        console.log("User ID is as nbelow")
        var userId = req.params.userId;
        console.log(userId);
        res.json(formModel.findAllFormsForUser(userId));
    }

    function findFormById(req,res){
        var fid = req.params.formId;
        res.json(formModel.findFormById(fid));
    }

    function deleteFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside deleteFormById on server JS");
        console.log("form ID to delete is ")

        var fid = req.params.formId;
        console.log(fid)
        res.json(formModel.deleteFormById(fid));
    }

    function createFormForUser(req,res){
        console.log("---------------------------------")
        console.log("Inside createFormForUser on server JS");
        console.log(req.body);
        console.log(req.params.userId);

        console.log("Inside createFormForUser on server JS");
        var form = req.body;
        var userId = req.params.userId;
        form._id = (new Date).getTime();
        form.userId = userId;
        res.json(formModel.createForm(form));
    }

    function updateFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside updateFormById on server JS");
        var formId = req.params.formId;
        var form = req.body;
        res.json(formModel.updateFormById(formId,form));
    }
};