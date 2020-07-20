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
    
    Post.create(post).then((post)=>{
        console.log(post)
        res.redirect("upload")
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/available", function(req, res){
    res.render("available.hbs")
})

router.get("/upload", function(req, res){
    console.log(req.session.username)
    res.render("upload.hbs")
})

module.exports = router