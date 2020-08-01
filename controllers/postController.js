const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const User = require("../models/user")
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function listingValidation(listing){
    if(listing.title && listing.user && listing.price && listing.status && listing.region && listing.description){
        if(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/.test(listing.price)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

router.post("/new-post", function(req, res){
    User.getUser(req.session.email).then((user)=>{
        var status = "Available"
        console.log(user.email)

        var post = {
            title : req.body.title,
            user : user.email,
            price : req.body.price,
            status : status,
            region : user.region,
            description : req.body.description
        }
        
         if(listingValidation(post)){
            Post.create(post).then((post)=>{
                res.redirect("upload")
            }, (error)=>{
                res.sendFile(error)
            })
        }
        else{
            //insert error message
            console.log("error")
            res.redirect("upload")
        }
    })
})

router.get("/available", function(req, res){
    Post.getAll().then((posts)=>{
        res.render("available.hbs", {posts})
        })
})

router.get("/listing", function(req,res){
    Post.get(req.id).then((post)=>{
        res.render("rental.hbs", {post})
    })
})

router.get("/upload", function(req, res){
    Game.getAll().then((games)=>{
        User.getUser(req.session.email).then((user)=>{
            res.render("upload.hbs", {
                games, user
            })
        })
    })
})

module.exports = router