const express = require("express")
const router = express.Router()
const Cart = require("../models/cart")
const Game = require("../models/game")
const Post = require("../models/post")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/add-to-cart", function(req, res){
    let postID = req.body.postingID

    Post.get(postID).then((post)=>{
        Game.getTitle(post.title).then((game)=>{
            var cart = {
                title : post.title,
                price : post.price, 
                link : game.link,
                user : post.user,
                release : game.release,
                duration : req.body.duration
            }
            
            Cart.add(cart).then((cart)=>{
                console.log(cart)
                res.render("upload.hbs")
            }, (error)=>{
                res.sendFile(error)
            })
        })
    })
})

module.exports = router