
module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")();
    var FormSchema = new mongoose.Schema(
        {
            userId: String,
            title: String,
            fields: [FieldSchema],
            created: {type: Date, default: Date.now},
            updated: {type: Date, default: Date.now},
        }, {collection: "assignment.form"});
    return FormSchema;
};