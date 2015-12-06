(function(){
    angular
        .module("YumMeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, $location){
        $scope.$location = $location;

        if($rootScope.currentUser != null){
            $scope.userName = $rootScope.currentUser.userName;
        }else{
            $scope.userName = "UserName"
        }
    }

})();