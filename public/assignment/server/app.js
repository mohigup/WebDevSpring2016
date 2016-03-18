module.exports = function(app){
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")(formModel);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
}