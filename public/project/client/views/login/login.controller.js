(function(){
    angular
        .module("YumMeApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, $location, $cookies, UserService){
        $scope.login = login;
        $scope.$location = $location;

        function login(){
            UserService.findUserByUsernameAndPassword(
                $scope.userName,
                $scope.password
            ).then(function(user){
                    if(user){
                        $rootScope.currentUser = user;
                        $cookies.putObject('user', user);

                        $location.url('/home');
                    }else{
                        alert("User does not exist.")
                        $location.url('/register');
                    }
            });
        }
    }
})();