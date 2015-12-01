module.exports = function(mongoose){
    var userSchema = mongoose.Schema({
        id: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String
    }, {
        collection: "cs5610.assignment.user"
    });

    return userSchema;
}