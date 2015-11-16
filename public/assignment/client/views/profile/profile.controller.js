(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, $location, UserService){
        $scope.$location = $location;
        $scope.update = update;

        function update(){
            var updatedUser = {
                username: $scope.updateUserName,
                password: $scope.updatePassword,
                firstName: $scope.updateFirstName,
                lastName: $scope.updateLastName,
                email: $scope.updateEmail
            }

            UserService.updateUser(
                $rootScope.currentUser.id,
                updatedUser
            ).then(function(updatedUser){
                $rootScope.currentUser = updatedUser;
            });
        }

    }
})();