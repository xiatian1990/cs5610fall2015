module.exports = function(mongoose){
    var userSchema = mongoose.Schema({
        id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        imgURL: String,
        cardCollection:[String],
        following: [String],
        followed: [String],
        chat: [{
            receiverId: String,
            text: [String],
            card: [String]
        }]
    }, {
        collection: "cs5610.project.user"
    });

    return userSchema;
}