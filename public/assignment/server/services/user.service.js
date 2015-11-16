module.export = function(app, model){

    app.post("/api/assignment/user", function(req, res)){
        var user = req.body;
        res.json(model.createUser(user));
    }

    app.get("/api/assignment/user", function(req, res)){
        var username = req.param("username");
        var password = req.param("password");

        if (username && password){
            var credential = {"username": username, "password": password};
            res.json(model.findUserByCredentials(credential));
        } else if (username && password == null){
            res.json(model.findUserByUsername(username));
        } else{
            res.json(model.findAllUsers);
        }
    }

    app.get("/api/assignment/user/:id", function{req, res}){
        var id = req.param("id");
        res.json(model.findUserById(id));
    }

    app.put("/api/assignment/user/:id", function(req, res)){
        var updatedUser = req.body;
        var id = req.param("id");
        res.json(model.updateUserById(id, updatedUser));
    }

    app.delete("/api/assignment/user/:id", function(req, res)){
        var id = req.param("id");
        res.json(model.deleteUserById(id));
    }
}