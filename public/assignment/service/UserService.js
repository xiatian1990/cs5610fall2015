(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var users = [{
            id: "1234567890",
            username: "timjobs",
            password: "12345"}];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password, callback){
            var existUser = null;
            for(var index in users){
                if(users[index].username === username && users[index].password === password){
                    existUser = users[index];
                }
            }
            callback(existUser);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function deleteUserById(userid, callback){
            for(var index in users){
                if(users[index].id === userid){
                    users.slice(index, 1);
                }
            }
            callback(users);
        }

        function createUser(newUser, callback){
            newUser.id = guid();
            users.push(newUser);
            callback(newUser);
        }

        function updateUser(userid, updatedUser, callback){
            for(var index in users){
                if(users[index].id === userid){
                    users[index].username = updatedUser.username;
                    users[index].password = updatedUser.password;
                    users[index].firstName = updatedUser.firstName;
                    users[index].lastName = updatedUser.lastName;
                    users[index].email = updatedUser.email;
                    callback(eachUser);
                }
            }
        }
    }

})();