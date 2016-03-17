"use strict";

module.exports = function(app, formModel) {


    app.post("/api/assignment/form/:formId/field", addFormField);
    app.get("/api/assignment/form/:formId/field", findAllFormFields);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFormFieldById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFormFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFormFieldById);
}