(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", function HeaderController($scope, $location){
        $scope.$location = $location
        });
})();