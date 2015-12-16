module.exports = function(app, model){
    var path = require('path');
    var fs = require('fs');

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUserByCredentials);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.post("/api/project/user/:userId/pic", upload);

    function upload(req, res){
        var tmp_path,target_path;
        //if file upload
        if(req.files.thumbnail.size>0){
            tmp_path = req.files.thumbnail.path;
            // set file folder to save uploaded images
            //rename image
            var picType=req.files.thumbnail.name.split(".");
            picType=picType[1];
            target_path = path.join(app.get("proot"), "uploads/user/" + req.params.userId + "." + picType);
            // move file
            fs.rename(tmp_path, target_path, function(err) {
                if (err) throw err;

                res.redirect('/project/client/index.html#/profile');
            });

//            //here a image file will show up in the user folder
//            imageMagick(target_path)
//            //resize the image to be 150*150
//                .resize(150, 150, '!')
//                .autoOrient()
//                .write(target_path, function(err){
//                    if (err) {
//                        console.log(err);
//                    }
//
//
//                });

        };
     }

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