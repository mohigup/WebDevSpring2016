

// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var adminModel    = require("./models/admin.model.server.js")(db, mongoose);
    var issueModel   = require("./models/issues.model.server.js")(db, mongoose);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var issueService = require("./services/issue.service.server.js")(app, issueModel);

}