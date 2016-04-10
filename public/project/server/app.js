/*
var uuid = require('node-uuid');

module.exports = function(app, uuid){
    //var gitModel = require("./models/git.commits.model.js")();
   var issueModel = require("./models/issues.model.server.js")();
    var adminModel = require("./models/admin.model.server.js")();

    //var gitService = require("./services/git.service.server.js")(app, gitModel);
   var issueService = require("./services/issue.service.server.js")(app, issueModel);
    var adminService = require("./services/admin.service.server.js") (app, adminModel);
}
*/

var uuid = require('node-uuid');

/*module.exports = function(app, uuid){
 var userModel = require("./models/user.model.js")();
 var formModel = require("./models/form.model.js")();
 var fieldModel = require("./models/field.model.js") (uuid,formModel);*/
// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var adminModel    = require("./models/admin.model.server.js")(db, mongoose);
    var issueModel   = require("./models/issues.model.server.js")(db, mongoose);

    var adminService = require("./services/admin.service.server.js")(app, adminModel);
    var issueService = require("./services/issue.service.server.js")(app, issueModel);

}