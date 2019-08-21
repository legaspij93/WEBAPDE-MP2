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
        cost: req.session.cost,
        status: "Available"
    }
    Post.create(post).then((post)=>{
        console.log(post)
        res.render("upload.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

module.exports = router