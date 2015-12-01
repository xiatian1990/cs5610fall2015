module.exports = function(app, model){

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function deleteUserById(req, res){
        model.deleteUserById(req.param("id")).then(function(users){
            res.json(users);
        });
    }

    function updateUser(req, res){
        var id = req.param("id");
        model.updateUser(id, req.body).then(function(updatedUser){
            res.json(updatedUser);
        });
    }

    function findUserById(req, res){
        model.findUserById(req.param("id")).then(function(foundUser){
            res.json(foundUser);
        });
    }

    function findUserByCredentials(req, res){
        var username = req.param("username");
        var password = req.param("password");

        if (username && password){
            var credential = {"username": username, "password": password};
            model.findUserByCredentials(credential).then(function(foundUser){
                res.json(foundUser);
            });
            return;
        }

        if (username){
            model.findUserByUsername(username).then(function(foundUser){
                res.json(foundUser);
            });
            return;
        }

        model.findAllUsers().then(function(users){
            res.json(users);
        });
    }

    function createUser(req, res){
        model.createUser(req.body)
            .then(function(user){
                res.json(user);
            });
    }
}