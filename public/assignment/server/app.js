var uuid = require('node-uuid');

module.exports = function(app, uuid){
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var fieldModel = require("./models/field.model.js") (uuid,formModel);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js") (app, formModel, fieldModel);
}