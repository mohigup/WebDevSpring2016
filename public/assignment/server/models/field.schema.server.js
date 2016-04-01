/**
 * Created by mohitgupta on 31/3/16.
 */
var mongoose = require('mongoose');

module.exports = function() {

    var FieldSchema = new mongoose.Schema(
        {
            label: String,
            type: {type: String, default: "TEXT"},
            placeholder: String,
            options: [{label: String, value: String}],
        }, {collection: "assignment.field"});
    return FieldSchema;
};

