const express = require("express")
const router = express.Router()
const Game = require("../models/game")
const bodyparser = require("body-parser")
const Post = require("../models/post")

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
        link : req.body.link,
        clicks: 0 
    }

    Game.create(game).then((game)=>{
        console.log(game)
        res.render("upload.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/games", function(req,res){
    Game.getAll().then((games)=>{
        res.render("dashboard.hbs", {
            games
        })
    })
})

router.get("/new-game", function(req,res){
    res.render("add.hbs")
})

router.get("/vg/:id", function(req,res){
    console.log(req.params.id)
    Game.get(req.params.id).then((game)=>{
        console.log(game)
        res.render("spiderman.hbs", {
            game
        })
    })
})

router.get("/testEach", function(req,res){
    Game.getAll().then((games)=>{
        res.render("testEach.hbs", {
            games
        })
    })
})

module.exports = router