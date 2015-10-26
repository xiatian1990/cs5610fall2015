(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService){
        $scope.$location = $location;
        $scope.register = register;
        $scope.newUser = {
            id: "",
            userName: "",
            password: "",
            email: "",
            firstName: "",
            lastName: ""};

        function register(){
            if($scope.password === $scope.verifiedPassword){
                $scope.newUser.userName = $scope.userName;
                $scope.newUser.password = $scope.password;
                $scope.newUser.email = $scope.email;

                UserService.createUser(
                    $scope.newUser,
                    function(newUser){
                        $rootScope.currentUser = newUser;
                        $location.url('/profile');
                    });
            }else{
                $location.url('/register');
            }
        }
    }
})();