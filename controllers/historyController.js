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

router.get('/history', async function(req, res){
    History.getAll().then(async function(history) {
      let userHistory = []
      
      for (let i in history) {
  
        const postingID = history[i].postingID
        const post = await Post.get(postingID)
        const game = await Game.getTitle(post.title)
  
        const historyRecord = {
          title : game.title,
          platform : game.platform,
          genre : game.genre,
          release : game.release,
          link : game.link,
          owner : post.user,
          date : history[i].rentDate,
          duration : history[i].duration,
          price : post.price,
          total: post.price * history[i].duration
        }
  
        userHistory.push(historyRecord)
      }
  
      res.render("history.hbs", {userHistory})
    })
})

module.exports = router