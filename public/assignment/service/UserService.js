(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var users = [{
            id: "1234567890",
            userName: "timjobs",
            password: "12345",
            firstName: "Tian",
            lastName: "Xia",
            email: "xt@gmail.com"}];

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(userName, password, callback){
            var existUser = null;
            for(var index in users){
                if(users[index].userName === userName && users[index].password === password){
                    existUser = users[index];
                }
            }
            callback(existUser);
        }

        function findAllUsers(callback){
            callback(users);
        }

        function deleteUserById(userId, callback){
            for(var index in users){
                if(users[index].id === userId){
                    users.slice(index, 1);
                }
            }
            callback(users);
        }

        function createUser(newUser, callback){
            newUser.id = Guid.create().value;
            users.push(newUser);
            callback(newUser);
        }

        function updateUser(userId, updatedUser, callback){
            for(var index in users){
                if(users[index].id === userId){
                    users[index].userName = updatedUser.userName;
                    users[index].password = updatedUser.password;
                    users[index].firstName = updatedUser.firstName;
                    users[index].lastName = updatedUser.lastName;
                    users[index].email = updatedUser.email;
                    callback(users[index]);
                }
            }
        }
    }

})();