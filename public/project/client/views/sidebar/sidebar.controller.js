(function(){
    angular
        .module("YumMeApp")
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $rootScope, $location, $rootScope, UserService){
        $scope.$location = $location
        $rootScope.q = $scope.q
        UserService.findAllUsers().then(function (users) {
            $scope.userList = users;
        })

    }
})()