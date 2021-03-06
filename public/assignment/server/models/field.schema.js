module.exports = function(mongoose){
    var fieldSchema = mongoose.Schema({
        id: String,
        label: String,
        type: {
            type: String,
            enum: ["TEXT", "TEXTAREA", "RADIOS", "CHECKBOXES", "OPTIONS", "DATE", "EMAIL"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    });
    return fieldSchema;
};