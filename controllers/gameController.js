const express = require("express")
const router = express.Router()
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/upload", function(req, res){
    var game = {
        title: req.body.title,
        platform: req.body.platform,
        genre: req.body.genre,
        date: req.body.date,
        rating: req.body.rating
    }
    Game.create(game).then((game)=>{
        console.log(game)
        res.render("upload.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/games", function(req,res){
    res.render("dashboard.hbs")
})

module.exports = router