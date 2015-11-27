(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q){
        var service = {
            getFieldsForForm: getFieldsForForm,
            createFieldForForm: createFieldForForm,
            deleteFieldForForm: deleteFieldForForm
        };

        return service;

        function getFieldsForForm(formId){
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function createFieldForForm(formId, newField){
            var deferred = $q.defer();

            $http.post("/api/assignment/form/" + formId + "/field", newField)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function deleteFieldForForm(formId, fieldId){
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(deferred.resolve);

            return deferred.promise;
        }
    }
})();