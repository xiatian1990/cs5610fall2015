module.exports = function(app, model){
    app.get("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.param("formId");
        res.json(model.findFieldsForForm(formId));
    })

    app.post("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.param("formId");
        var newField = req.body;
        res.json(model.createFieldForForm(formId, newField));
    })

    app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res){
        var formId = req.param("formId");
        var fieldId = req.param("fieldId");
        res.json(model.deleteFieldForForm(formId, fieldId));
    })
}