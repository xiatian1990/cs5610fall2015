module.exports = function(app, model){

    app.get("/api/project/user/:userId/card", findAllCardsForUser);
    app.get("/api/project/card/:cardId", findCardById);
    app.get("/api/project/card", loadAllCards);
    app.post("/api/project/user/:userId/card", createCardForUser);
    app.put("/api/project/card/:cardId", addCommentToCard);
    app.delete("/api/project/card/:cardId", deleteCardById);
    app.put("/api/project/card/:cardId", updateCardById);

    function addCommentToCard(req, res){
        var comment = req.body;
        model.addCommentToCard(
            req.param("cardId"),
            comment
        ).then(function(comments){
            res.json(comments)
        })
    }

    function findCardById(req, res){
        model.findCardById(req.param("cardId")).then(function(card){
            res.json(card);
        });
    }

    function loadAllCards(req, res){
        model.loadAllCards().then(function(cards){
           res.json(cards);
        });
    }

    function updateCardById(req, res){
        var updatedCard = req.body;
        model.updateCardById(req.param("cardId"), updatedCard).then(function(cards){
           res.json(cards);
        });
    }

    function deleteCardById(req, res){
        model.deleteCardById(req.param("cardId")).then(function(cards){
            res.json(cards);
        });
    }

    function createCardForUser(req, res){
        var newCard = req.body;
        model.createCardForUser(req.param("userId"), newCard).then(function(cards){
            res.json(cards);
        });
    }

    function findAllCardsForUser(req, res){
        model.findAllCardsForUser(req.param("userId")).then(function(cards){
            res.json(cards);
        });
    }
}