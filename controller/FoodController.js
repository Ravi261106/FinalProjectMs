var foodSchema = require("../model/foodModel")

getfood = (req, res, next) => {
    foodSchema.find((err, response) => {
        console.log(response)
        if (err)
            res.send("Exception Occured")
        else
            res.send(response);
    })
}

addfood = (req, res, next) => {
    var foodToAdd = new foodSchema({
        meal_type: req.body.meal_type,
        image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        cuisine: req.body.cuisine

    })

    foodToAdd.save((err, response) => {
        if (err)
            res.send("Exception Occurred");
        else
            res.send({ status: 200, message: "Food added successfully", restaurant: response });
    })
}


module.exports = { getfood, addfood }