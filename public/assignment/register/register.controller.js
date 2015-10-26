(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService){
        $scope.$location = $location;
        $scope.register = register;

        function register(){
            if($scope.password === $scope.verifiedPassword){
                $scope.newUser = {
                    id: "",
                    userName: $scope.userName,
                    password: $scope.password,
                    email: $scope.email,
                    firstName: "Please Input First Name",
                    lastName: "Please Input Last Name"};

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