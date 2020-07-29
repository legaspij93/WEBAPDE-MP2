const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const User = require("../models/user")
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
    var user = User.getUser(req.session.username)
    var status = "Available"
    console.log(user.username)

    var post = {
        title : req.body.title,
        user : user.firstName + " " + user.lastName,
        price : req.body.price,
        status : status,
        region : user.region,
        description : req.body.description
    }
    
    if(listingValidation(post)){
        Post.create(post).then((post)=>{
            console.log(post)
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

router.get("/available", function(req, res){
    res.render("available.hbs")
})

router.get("/upload", function(req, res){
    console.log(req.session.username)
    res.render("upload.hbs")
})

module.exports = router