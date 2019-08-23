const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/new-post", function(req, res){
    var username = req.session.username
    var status = "Available"
    console.log(username)

    var post = {
        title : req.body.title,
        user : username,
        price : req.body.price,
        status : status,
        region : req.body.region,
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