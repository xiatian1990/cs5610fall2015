(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q){
        var service = {
            getFieldsForForm: getFieldsForForm,
            createFieldForForm: createFieldForForm
        };

        return service;

        function getFieldsForForm(formId){
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function createFieldForForm(){}
    }
})();