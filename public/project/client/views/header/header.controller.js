(function(){
    angular
        .module("YumMeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $cookies, $location){
        $scope.$location = $location;
        $scope.logout = logout;

        if($rootScope.currentUser != null){
            $scope.userName = $rootScope.currentUser.userName;
        }else{
            $scope.userName = "UserName"
        }

        function logout(){
            $rootScope.currentUser = null;
            console.log("in")

            $cookies.remove("user");
        }
    }
})();