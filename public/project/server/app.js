module.exports = function(app, mongoose, db){

    var uModel = require("./models/user.model.js")(app, mongoose, db);
    var formModel = require("./models/card.model.js")(app, mongoose, db);

    require("./services/user.service.js")(app, uModel);
    require("./services/card.service.js")(app, formModel);
    //require("./services/field.service.js")(app, formModel);

};