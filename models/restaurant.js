const mongoose = require("mongoose");

// create a schema
const RestaurantSchema = new mongoose.Schema({
    res_num: {
        type: String,
        required: [true, "Restaurant Number (ID) cannot be null"]
    },
    name: {
        type: String,
        required: [true, "Name cannot be null"]
    },
    time: {
        type: [String]
    },
    nation: {
        type: String
    },
    totalRating: {
        type: Number
    },
    ratingNumber: {
        type: Number
    }
});

// 2. compile the schema into a model
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;  // export so that it can be consumed by the other files