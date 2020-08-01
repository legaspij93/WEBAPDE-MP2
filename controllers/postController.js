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
                res.redirect("/user/profile")
            }, (error)=>{
                res.sendFile(error)
            })
        }
        else{
            req.session.errors = []
            if(!post.title)
                req.session.errors.push({"container-id": "title","message": "Game is not selected"})
            if(post.price < 0 || post.price > 10000)
                req.session.errors.push({"container-id": "price","message": "Invalid price value, must be between 0 and 10000"})
            if(post.description == '')
                req.session.errors.push({"container-id": "description","message": "Condition must be filled"})
            
            req.session.savedinput = [{"container-id": "price", "content": post.price}, 
                                      {"container-id": "description", "content": post.description}]
            if(req.body.title)
                req.session.savedinput.push({"container-id": "title", "content": post.title})
            res.redirect("upload")
        }
    })
})

router.get("/available", function(req, res){
    res.render("available.hbs")
})

router.get("/upload", function(req, res){
    var errors = req.session.errors
    var savedinput = req.session.savedinput
    req.session.errors = null
    req.session.savedinput = null
    Game.getAll().then((games)=>{
        User.getUser(req.session.email).then((user)=>{
            res.render("upload.hbs", {
                games, user, errors, savedinput
            })
        })
    })
})

module.exports = router