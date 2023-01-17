const mongoose = require("mongoose");

// create a schema
const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email cannot be null"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be null"]
    },
    type: {
        type: String,
        enum: ['admin', 'student']
    },
    wished: {
        type: [String],
        required: function() { return (this.type === 'student') }
    }
});

// 2. compile the schema into a model
const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;  // export so that it can be consumed by the other files