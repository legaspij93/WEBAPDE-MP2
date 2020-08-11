const express = require("express")
const router = express.Router()
const History = require("../models/history")
const Game = require("../models/game")
const Post = require("../models/post")
const Cart = require("../models/cart")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/newHistory", function(req,res){
    Cart.getAll().then((carts)=>{
        for(var i in carts){
            var today = new Date()

            var history = {
                user : req.session.email,
                postingID: carts[i].ID, 
                rentDate: (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear(),
                duration: carts[i].duration
            }

            History.add(history).then((history)=>{
                console.log(history)
            }, (error)=>{
                res.sendFile(error)
            })
        }
        Cart.deleteAll()
        res.redirect("/game/games")
    })
})

module.exports = router