"use strict";

module.exports = function(app,issueModel) {
    app.get("/api/admin/form", getForms);
    app.post("/api/admin/form", createFormForUser);
    app.put("/api/admin/form/:formId",updateFormById);
    app.delete("/api/admin/form/:formId", deleteFormById);
/*    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);*/

    function getForms(req,res){
        console.log("---------------------------------")
        console.log("Inside getFormsForUser on server JS");
        console.log("User ID is as nbelow")
        res.json(issueModel.getForms());
    }

    function createFormForUser(req,res){
        console.log("---------------------------------")
        console.log("Inside createFormForUser on server JS");
        console.log(req.body);
        var form = req.body;
        res.json(issueModel.createForm(form));
    }
    function updateFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside updateFormById on server JS");
        var formId = req.params.formId;
        var form = req.body;
        res.json(issueModel.updateFormById(formId,form));
    }

    function deleteFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside deleteFormById on server JS");
        console.log("form ID to delete is ")

        var fid = req.params.formId;
        console.log(fid)
        res.json(issueModel.deleteFormById(fid));
    }

}