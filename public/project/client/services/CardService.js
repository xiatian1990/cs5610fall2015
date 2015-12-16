(function(){
    angular
        .module("YumMeApp")
        .factory("CardService", CardService);

    function CardService($http, $q){

        var service = {
            createCardForUser: createCardForUser,
            findAllCardsForUser: findAllCardsForUser,
            deleteCardById: deleteCardById,
            updateCardById: updateCardById,
            loadAllCards: loadAllCards,
            findCardById: findCardById,
            addCommentToCard: addCommentToCard
        }

        return service;

        function addCommentToCard(cardId, comment){
            var deferred = $q.defer();
            $http.put("/api/project/card/" + cardId, comment)
                .success(deferred.resolve);
            return deferred.promise;
        }

        function findCardById(cardId){
            var deferred = $q.defer();
            $http.get("/api/project/card/" + cardId)
                .success(deferred.resolve);
            return deferred.promise;
        }

        function loadAllCards(userId){
            var deferred = $q.defer();
            $http.get("/api/project/card")
                .success(deferred.resolve);
            return deferred.promise;
        }

        function createCardForUser(userId, card){
            var deferred = $q.defer();
            $http.post("/api/project/user/" + userId + "/card", card)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function findAllCardsForUser(userId){
            var deferred = $q.defer();
            $http.get("/api/project/user/" + userId + "/card")
                .success(deferred.resolve);

            return deferred.promise;
        }

        function deleteCardById(cardId){
            var deferred = $q.defer();
            $http.delete("/api/project/card/" + cardId)
                .success(deferred.resolve);

            return deferred.promise;
        }

        function updateCardById(cardId, newCard){
            var deferred = $q.defer();
            $http.put("/api/project/card/" + cardId, newCard)
                .success(deferred.resolve);

            return deferred.promise;
        }
    }

})();