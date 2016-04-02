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

        formModel.findAllFormsForUser(userId)
            .then(
                function(forms){
                    res.json(forms);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function findFormById(req,res){
        var fid = req.params.formId;
        formModel.findFormById(fid)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside deleteFormById on server JS");
        console.log("form ID to delete is ")

        var fid = req.params.formId;
        console.log(fid)

        formModel.deleteFormById(fid)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
        res.send(200);
        //res.json(formModel.deleteFormById(fid));
    }

    function createFormForUser(req,res){
        console.log("---------------------------------")
        console.log("Inside createFormForUser on server JS");
        console.log(req.body);
        console.log(req.params.userId);

        console.log("Inside createFormForUser on server JS");
        var form = req.body;
        var userId = req.params.userId;

        form.userId = userId;
        formModel.createForm(form)
            .then(
                function(form){
                    res.json(form);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    function updateFormById(req,res){
        console.log("---------------------------------")
        console.log("Inside updateFormById on server JS");
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId, form)
            .then(
                function(response){
                    res.send(response.result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }
};