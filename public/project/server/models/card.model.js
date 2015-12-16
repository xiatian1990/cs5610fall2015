var cards = require("./card.mock.json");
var uuid = require("node-uuid");
var Q = require("q");

module.exports = function(app, mongoose, db){

    var cardSchema = require("./card.schema.js")(mongoose);
    var cardModel = mongoose.model("cardModel", cardSchema);

    //init cards mock to Mongodb
    for(var index in cards){
        initCardToDB(cards[index]);
    }

    var api = {
        createCardForUser: createCardForUser,
        findAllCardsForUser: findAllCardsForUser,
        deleteCardById: deleteCardById,
        updateCardById: updateCardById,
        findCardByTitle: findCardByTitle,
        findFieldsForCard: findFieldsForCard,
        createFieldForCard: createFieldForCard,
        deleteFieldForCard: deleteFieldForCard,
        loadAllCards: loadAllCards,
        findCardById: findCardById,
        addCommentToCard: addCommentToCard
    };

    return api;

    function addCommentToCard(cardId, comment){
        var deferred = Q.defer();
        cardModel.findOne({id: cardId}, function(err, foundCard){
            foundCard.comment.push(comment);
            foundCard.save(function(err, card){
                deferred.resolve(card.comment);
            });
        });
        return deferred.promise;
    }

    function findCardById(cardId){
        var deferred = Q.defer();
        cardModel.findOne({id: cardId}, function(err, foundCard){
            deferred.resolve(foundCard);
        });
        return deferred.promise;
    }

    function initCardToDB(card){
        var deferred = Q.defer();
        cardModel.find({id: card.id}, function(err, cards){
            if (cards.length > 0){
                console.log("card already exists")
            }else{
                cardModel.create(card, function(err, card){
                    deferred.resolve(card);
                });
            }
        });
    }

    function loadAllCards(){
        var deferred = Q.defer();
        cardModel.find(function(err, foundCards){
            deferred.resolve(foundCards);
        });
        return deferred.promise;
    }

    function findCardByTitle(title){
        var deferred = Q.defer();

        cardModel.findOne({title: title}, function(err, foundCard){
            deferred.resolve(foundCard);
        });
        return deferred.promise;
    }

    function findAllCardsForUser(userId){
        var deferred = Q.defer();

        cardModel.find({userId: userId}, function(err, cards){
            deferred.resolve(cards);
        });
        return deferred.promise;
    }

    function createCardForUser(userId, card){
        var deferred = Q.defer();

        card.id = uuid.v1();
        card.userId = userId;

        cardModel.create(card, function(err, cards){
            deferred.resolve(cards);
        });

        var userCards = findAllCardsForUser(userId);
        return userCards;
    }

    function deleteCardById(cardId){
        var deferred = Q.defer();

        cardModel.findOne({id: cardId}, function(err, card){
            if (! err){
                cardModel.remove({id: cardId}, function(err, status){
                    console.log(err);
                });
                cardModel.find({userId: card.userId}, function(err, cards){
                    deferred.resolve(cards);
                });
            }
        });
        return deferred.promise;
    }

    function updateCardById(cardId, newCard){
        var deferred = Q.defer();

        cardModel.findOne({id: cardId}, function(err, foundCard){
            if(foundCard && newCard){
                for (var key in newCard){
                    foundCard[key] = newCard[key];
                }

                foundCard.save(function(err, foundCard){
                    cardModel.find({userId: foundCard.userId}, function(err, cards){
                        deferred.resolve(cards);
                    })
                })
            }
        });
        return deferred.promise;
    }

    function findFieldsForCard(cardId){
        var deferred = Q.defer();

        cardModel.findOne({id: cardId}, function(err, card){
            deferred.resolve(card.fields);
        });
        return deferred.promise;
    }

    function createFieldForCard(cardId, newField){
        var deferred = Q.defer();
        newField.id = uuid.v1();

        cardModel.findOne({id: cardId}, function(err, card){
            card.fields.push(newField);
            card.save(function(err, card){
                deferred.resolve(card.fields);
            });
        });
        return deferred.promise;
    }

    function deleteFieldForCard(cardId, fieldId){
        var deferred = Q.defer();
        cardModel.findOne({id: cardId}, function(err, card){
            for (var index in card.fields){
                if (card.fields[index].id === fieldId){
                    card.fields.splice(index, 1);
                }
            }
            card.save(function(err, card){
                deferred.resolve(card.fields);
            });
        });
        return deferred.promise;
    }
}