var uuid = require('node-uuid');

module.exports = function(app, uuid){
    //var gitModel = require("./models/git.commits.model.js")();
   var issueModel = require("./models/issues.model.js")();
    var adminModel = require("./models/admin.model.js")();

    //var gitService = require("./services/git.service.server.js")(app, gitModel);
   var issueService = require("./services/issue.service.server.js")(app, issueModel);
    var adminService = require("./services/admin.service.server.js") (app, adminModel);
}