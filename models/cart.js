const mongoose = require("mongoose")

var cartSchema = mongoose.Schema({
    title: String,
    platform: String,
    price: Number
}) 

var Cart = mongoose.model("cart", gameSchema)

