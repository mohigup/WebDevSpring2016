"use strict";

module.exports = function(app, formModel) {


    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.get("/api/assignment/user/:userId/form", findFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
}