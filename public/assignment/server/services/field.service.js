module.exports = function(app, model){
    app.get("/api/assignment/form/:formId/field", findFieldsForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);

    function deleteFieldForForm(req, res){
        model.deleteFieldForForm(req.param("formId"), req.param("fieldId")).then(function(fields){
            res.json(fields);
        });
    }

    function createFieldForForm(req, res){
        var newField = req.body;
        model.createFieldForForm(req.param("formId"), newField).then(function(fields){
            res.json(fields);
        });
    }

    function findFieldsForForm(req, res){
        model.findFieldsForForm(req.param("formId")).then(function(fields){
            res.json(fields);
        });
    }
}