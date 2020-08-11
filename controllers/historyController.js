const express = require("express")
const router = express.Router()
const History = require("../models/history")
const Game = require("../models/game")
const Post = require("../models/post")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.get("/history", function(req, res){
    History.getAll().then((history)=>{
        var userHistory = []
        for (var i in history){
            Post.get(history[i].postingID).then((post)=>{
                Game.getTitle(post.title).then((game)=>{
                    let his = {
                        title : game.title,
                        platform : game.platform,
                        genre : game.genre,
                        release : game.release,
                        link : game.link,
                        owner : post.user,
                        date : history[i].rentDate,
                        duration : history[i].duration,
                        price : post.price
                    } 
                    userHistory.push(his)
                })
            })
        }
        console.log(userHistory)
        //insert render or redirect below
        // res.render("history.hbs", {userHistory})
    })
})

module.exports = router