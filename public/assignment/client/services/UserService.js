(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q){

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByUsernameAndPassword(username, password){
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username" + username + "&password=" + password)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function findAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" + userId)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function createUser(newUser){
            var deferred = $q.defer();
            $http.post("/api/assignment/user", newUser)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function updateUser(userId, updatedUser){
            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userId, updatedUser)
                .success(deferred.resolve);

            return deferred.promise;
        }
    }

})();