(function(){
    angular
        .module("YumMeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $rootScope, $location, CardService){
        $scope.$location = $location;
        $scope.collect = collect

        $scope.cards = CardService.loadAllCards();

        function collect(index){
            if ($rootScope.currentUser){
                $rootScope.currentCard = $scope.cards[index];
                console.log(index);
                console.log($rootScope.currentCard);
            }else{
                alert("Please Login to collect cards");
            }
        }
    }
})();