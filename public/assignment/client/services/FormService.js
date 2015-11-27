(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q){

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
        }

        return service;

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            $http.post("/api/assignment/user/" + userId + "/form", form)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId + "/form")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function updateFormById(formId, newForm){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, newForm)
                .success(deferred.resolve);

            return deferred.promise;
        }
    }

})();