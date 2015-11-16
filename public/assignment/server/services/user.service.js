module.export = function(app, model){

    app.post("/api/assignment/user", function(req, res)){
        res.json(model.createUser(req.body))
    }

    app.get("/api/assignment/user", function(req, res)){
        res.json(model.findAllUsers)
    }

}