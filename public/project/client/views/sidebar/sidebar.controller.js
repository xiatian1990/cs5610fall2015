(function(){
    angular
        .module("YumMeApp")
        .controller("SidebarController", SidebarController)

    function SidebarController($scope, $location){
        $scope.$location = $location
    }
})()