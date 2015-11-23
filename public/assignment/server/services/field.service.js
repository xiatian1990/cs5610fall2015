module.exports = function(app, model){
    app.get("/api/assignment/form/:formId/field", function(req, res){
        var formId = req.param("formId");
        res.json(model.findFieldsForForm(formId));
    })
}