module.exports = function(app, model){

    app.post("/api/assignment/user/:userId/form", function(req, res){
        var newForm = req.body;
        var userId = req.param("userId");
        res.json(model.createFormForUser(userId, newForm));
    });

    app.get("/api/assignment/user/:userId/form", function(req, res){
        var userId = req.param("userId");
        res.json(model.findAllFormsForUser(userId));
    })

    app.get("/api/assignment/user/:id", function(req, res){
        var id = req.param("id");
        res.json(model.findUserById(id));
    });

    app.put("/api/assignment/form/:formId", function(req, res){
        var updatedForm = req.body;
        var id = req.param("formId");
        res.json(model.updateFormById(id, updatedForm));
    });

    app.delete("/api/assignment/form/:formId", function(req, res){
        var formId = req.param("formId");
        res.json(model.deleteFormById(formId));
    });
}