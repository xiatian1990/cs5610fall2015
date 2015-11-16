module.export = function(app){
    var users = require("./user.mock.json");
    var uuid = require("node-uuid");

    var api = {
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
        findUserByUsername: fineUserByUsername,
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
        for(var index in users){

            if(users[index].id === userId){

                if(updatedUser.userName != null){
                    users[index].userName = updatedUser.userName;
                }

                if(updatedUser.password != null){
                    users[index].password = updatedUser.password;
                }

                if(updatedUser.firstName != null){
                    users[index].firstName = updatedUser.firstName;
                }

                if(updatedUser.lastName != null){
                    users[index].lastName = updatedUser.lastName;
                }

                if(updatedUser.email != null){
                    users[index].email = updatedUser.email;
                }

                return users;
            }
        }
    }
}