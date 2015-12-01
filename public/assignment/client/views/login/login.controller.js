(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, UserService){
        $scope.login = login;
        $scope.$location = $location;

        function login(){
            UserService.findUserByUsernameAndPassword(
                $scope.userName,
                $scope.password
            ).then(function(user){
                    if(user){
                        $rootScope.currentUser = user;
                        $location.url('/profile');
                    }else{
                        $location.url('/register');
                    }
            });
        }
    }
})();