const express = require("express")
const router = express.Router()
const Cart = require("../models/cart")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/add-to-cart", function(req, res){
    
    var cart = {
        title : req.body.title,
        price : req.body.price, 
        link : req.body.link,
    }

    Cart.create(cart).then((cart)=>{
        console.log(cart)
        res.render("upload.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})