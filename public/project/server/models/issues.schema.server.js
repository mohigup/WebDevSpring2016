
module.exports = function(mongoose) {

    var IssueSchema = new mongoose.Schema(
        {
            status: String,
            title: String,
            desc: String,
            email: String,
            created: {type: Date, default: Date.now},
            updated: {type: Date, default: Date.now},
        }, {collection: "project.issues"});
    return IssueSchema;
};