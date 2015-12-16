(function(){
    angular
        .module("YumMeApp")
        .factory("UserService", UserService);

    function UserService($http, $q){

        var service = {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
        };

        return service;

        function findUserByUsernameAndPassword(username, password){
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function findAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userId)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function createUser(newUser){
            var deferred = $q.defer();
            $http.post("/api/project/user", newUser)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function updateUser(userId, updatedUser){
            var deferred = $q.defer();
            $http.put("/api/project/user/" + userId, updatedUser)
                .success(deferred.resolve);

            return deferred.promise;
        }
    }

})();