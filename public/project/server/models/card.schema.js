module.exports = function(mongoose){

    var cardSchema = mongoose.Schema({
        id: String,
        title: String,
        userId: String,
        tags: [String],
        imgUrl: String,
        description: String,
        rating: String,
        location: {
            restaurant: String,
            city: String,
            state: String
        },
        comment: [{
            userId: String,
            username: String,
            message: String
        }],

    },{
        collection: "cs5610.project.card"
    });
    return cardSchema;
};