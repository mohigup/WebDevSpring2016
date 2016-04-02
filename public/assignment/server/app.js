var uuid = require('node-uuid');

/*module.exports = function(app, uuid){
    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var fieldModel = require("./models/field.model.js") (uuid,formModel);*/
// pass db and mongoose reference to server side application module
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var formModel   = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/field.model.server.js") (db,mongoose,formModel);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js") (app, formModel, fieldModel);
}