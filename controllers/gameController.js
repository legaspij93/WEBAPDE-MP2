const express = require("express")
const router = express.Router()
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/add-game", function(req, res){
    
    var game = {
        title : req.body.title,
        platform : req.body.platform,
        genre : req.body.genre,
        release : req.body.release,
        rating : req.body.rating,
        description : req.body.description,
        link : req.body.link 
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

router.get("/new-game", function(req,res){
    res.render("add.hbs")
})

module.exports = router