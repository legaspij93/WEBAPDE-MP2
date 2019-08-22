const express = require("express")
const router = express.Router()
const Post = require("../models/post")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/upload", function(req, res){
    var post = {
        title: req.body.title,
        user: req.session.username,
        cost: req.body.cost,
        status: "Available",
        region: req.body.region,
        rentStart: req.body.rentStart,
        rentEnd: req.body.rentEnd
    }
    Post.create(post).then((post)=>{
        console.log(post)
        res.render("upload.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/available", function(req, res){
    res.render("spiderman.hbs")
})

router.get("/upload", function(req, res){
    res.render("upload.hbs")
})

module.exports = router