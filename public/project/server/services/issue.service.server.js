"use strict";

module.exports = function(app,issueModel) {
    app.get("/api/admin/form", getIssues);
    app.post("/api/admin/form", createIssue);
    app.put("/api/admin/form/:formId",updateIssueById);
    app.delete("/api/admin/form/:formId", deleteIssueById);
/*    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);*/

    function getIssues(req,res){
        console.log("---------------------------------")
        console.log("Inside all Issues on server JS");
        issueModel.getIssues()
            .then(
                function(issues){
                    res.json(issues);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createIssue(req,res){
        console.log("---------------------------------")
        console.log("Inside createFormForUser on server JS");
        console.log(req.body);
        var form = req.body;
        issueModel.createIssue(form)
            .then(
                function(issue){
                    res.json(issue);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }
    function updateIssueById(req,res){
        console.log("---------------------------------")
        console.log("Inside updateFormById on server JS");
        var formId = req.params.formId;
        var form = req.body;
       issueModel.updateIssueById(formId,form)
           .then(
               function(response){
                   res.send(response.result);
               },
               function(err){
                   res.status(400).send(err);
               }
           );
    }

    function deleteIssueById(req,res){
        console.log("---------------------------------")
        console.log("Inside deleteFormById on server JS");
        console.log("form ID to delete is ")

        var fid = req.params.formId;
        console.log(fid)
        issueModel.deleteIssueById(fid)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        res.send(200);
    }

}