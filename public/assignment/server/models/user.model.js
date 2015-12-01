var users = require("./user.mock.json");
var uuid = require("node-uuid");
var Q = require("q");

module.exports = function(app, mongoose, db){

    var userSchema = require("./user.schema.js")(mongoose);
    var userModel = mongoose.model("userModel", userSchema);

    //init the db with mock.json
    for(var index in users){
        createUser(users[index]);
    }

    var api = {
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByUsername(username){
        var deferred = Q.defer();

        userModel.findOne({username: username}, function(err, user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByCredentials(credential){
        var deferred = Q.defer();

        var username = credential.username;
        var password = credential.password;

        userModel.findOne({username: username, password: password}, function(err, user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserById(id){
        var deferred = Q.defer();

        userModel.findOne({id: id}, function(err, user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findAllUsers(){
        var deferred = Q.defer();

        userModel.find(function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function deleteUserById(userId){
        var deferred = Q.defer();

        userModel.remove({id: userId}, function(err, users){
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function createUser(newUser){
        var deferred = Q.defer();

        userModel.find({username: newUser.username}, function(err, users){
            if (users.length > 0){
                console.log("username exists, please use another username.")
            }else{
                if (! newUser.id){
                    newUser.id = uuid.v1();
                }
                userModel.create(newUser, function(err, user){
                    deferred.resolve(user);
                });
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, updatedUser){
        var deferred = Q.defer();

        userModel.findOne({id: userId}, function(err, foundUser){
            if (foundUser && updatedUser){
                for(var key in updatedUser){
                    foundUser[key] = updatedUser[key];
                }
                foundUser.save(function(err, foundUser){
                    deferred.resolve(foundUser);
                });
            }
        })
        return deferred.promise;
    }
};