module.exports = function(app){
    var users = require("./user.mock.json");
    var uuid = require("node-uuid");

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
        var existUser = null;
        for(var index in users){
            if(users[index].username === username){
                existUser = users[index];
            }
        }
        return existUser;
    }


    function findUserByCredentials(credential){
        var username = credential.username;
        var password = credential.password;
        var existUser = null;
        for(var index in users){
            if(users[index].username === username && users[index].password === password){
                existUser = users[index];
            }
        }
        return existUser;
    }

    function findUserById(id){

        var existUser = null;
        for(var index in users){
            if(users[index].id === id){
                existUser = users[index];
            }
        }
        return existUser;
    }


    function findAllUsers(){
        return users;
    }

    function deleteUserById(userId){
        for(var index in users){
            if(users[index].id === userId){
                users.slice(index, 1);
            }
        }
        return users;
    }

    function createUser(newUser){
        newUser.id = uuid.v1();
        users.push(newUser);
        return users;
    }

    function updateUser(userId, updatedUser){
        var curUser = findUserById(userId);
        if (curUser && updatedUser){

            if(updatedUser.username){
                curUser.username = updatedUser.username;
            }

            if(updatedUser.password){
                curUser.password = updatedUser.password;
            }

            if(updatedUser.firstName){
                curUser.firstName = updatedUser.firstName;
            }

            if(updatedUser.lastName){
                curUser.lastName = updatedUser.lastName;
            }

            if(updatedUser.email){
                curUser.email = updatedUser.email;
            }

            return curUser;
        }
    }
}