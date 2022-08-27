var mongoose = require("mongoose");

const foodSchema = mongoose.Schema([{
    meal_type: String,
    image: String,
    name: String,
    price: Number,
    cuisine: String

}])

const food = mongoose.model("food", foodSchema);

module.exports = food;