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

        FormService.findAllFormsForUser(
            currentUserId,
            function(forms){
                $scope.forms = forms;
            }
        );

        function addForm(){
            if ($scope.formName != "" && $scope.formName != null){

                var newForm = {
                    id: "0",
                    userId: currentUserId,
                    name: $scope.formName
                };


                FormService.createFormForUser(
                    currentUserId,
                    newForm,
                    function(forms){
                        $scope.forms = forms;
                    }
                );

                $scope.formName = "";



            }else{
                alert("please input form name")
            }
        }

        function selectForm(index){
            $scope.currentForm = $scope.forms[index];
            $scope.formName = $scope.currentForm.name;
        }

        function updateForm(){

            if($scope.currentForm != null){
                var newForm = {
                    id: $scope.currentForm.id,
                    userId: currentUserId,
                    name: $scope.formName
                };

                FormService.updateFormById(
                    $scope.currentForm.id,
                    newForm,
                    function(form){
                        $scope.formName = "";
                    }
                )
            }else{
                alert("please select one form");
            }
        }

        function deleteForm(index){
            FormService.deleteFormById(
                $scope.forms[index].id,
                function (forms){
                    $scope.forms = forms;
                }
            )
        }
    }
})();