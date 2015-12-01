module.exports = function(app, model){

    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.put("/api/assignment/form/:formId", updateFormById);

    function updateFormById(req, res){
        var updatedForm = req.body;
        model.updateFormById(req.param("formId"), updatedForm).then(function(forms){
           res.json(forms);
        });
    }

    function deleteFormById(req, res){
        model.deleteFormById(req.param("fromId")).then(function(forms){
            res.json(forms);
        });
    }

    function createFormForUser(req, res){
        var newForm = req.body;
        model.createFormForUser(req.param("userId"), newForm).then(function(forms){
            res.json(forms);
        });
    }

    function findAllFormsForUser(req, res){
        model.findAllFormsForUser(req.param("userId")).then(function(forms){
            res.json(forms);
        });
    }
}