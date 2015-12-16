(function(){
    angular
        .module("YumMeApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, $routeParams, CardService){
        $scope.$location = $location;
        $scope.submitComment = submitComment;
        $scope.com = {};

        var cardId = $routeParams.cardId;

        function submitComment(){
            if ($rootScope.currentUser){
                var comment = {
                    userId: $rootScope.currentUser.id,
                    username: $rootScope.currentUser.username,
                    message: $scope.com.m
                }

                CardService.addCommentToCard(
                    cardId,
                    comment
                ).then(
                    function(comments){
                        $scope.card.comment = comments;
                    }
                )
            }else{
                alert("Please Login to comment")
            }
        }

        function findCardById(cardId){
            CardService.findCardById(cardId).then(
                function(card){
                    $scope.card = card;
                }
            )
        }

        findCardById(cardId);
    }
})();