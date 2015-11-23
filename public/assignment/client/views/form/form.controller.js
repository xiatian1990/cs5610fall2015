(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService){
        $scope.$location = $location;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.deleteForm = deleteForm;

        var currentUserId = $rootScope.currentUser.id;

        FormService.findAllFormsForUser(currentUserId)
            .then(
                function(forms){
                    $scope.forms = forms;
                }
            );

        function addForm(){
            if ($scope.formName != "" && $scope.formName != null){

                var newForm = {
                    id: "",
                    userId: currentUserId,
                    title: $scope.formName
                };

                FormService.createFormForUser(currentUserId, newForm)
                    .then(
                        function(userForms){
                            $scope.forms = userForms;
                        }
                    );
                $scope.formName = "";
            }else{
                alert("please input form name")
            }
        }

        function selectForm(index){
            $scope.currentForm = $scope.forms[index];
            $scope.formName = $scope.currentForm.title;
        }

        function updateForm(){

            if($scope.currentForm != null){
                var newForm = {
                    id: $scope.currentForm.id,
                    userId: currentUserId,
                    title: $scope.formName
                };

                FormService.updateFormById(
                    $scope.currentForm.id,
                    newForm
                ).then(
                    function(forms){
                        $scope.forms = forms
                        $scope.formName = "";
                    }
                )
            }else{
                alert("please select one form");
            }
        }

        function deleteForm(index){
            FormService.deleteFormById(
                $scope.forms[index].id
            ).then(
                function (forms){
                    $scope.forms = forms;
                }
            )
        }
    }
})();