const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/register", function(req, res){
    var user = {
        username : req.body.username,
        password : req.body.password
    }
    User.create(user).then((user)=>{
        console.log(user)
        req.session.username = user.username
        res.render("loginscreen.hbs")
    }, (error)=>{
        res.sendFile(error)
    })
})

router.post("/login", function(req, res){
    let user = {
        username: req.body.username,
        password: req.body.password
    }
    
    User.authenticate(user).then((newUser)=>{
        if(newUser){
            req.session.username = user.username
            console.log(req.session.username)
            res.redirect("/game/games")
            // res.render("dashboard.hbs")
        }
    }, (error)=>{
        res.sendFile(error)
    })
})

router.get("/loginpage", function(req,res){
    res.render("loginscreen.hbs")
})

router.get("/profile", function(req,res){
    currUser = req.session.username
    User.getUser(currUser).then((newUser)=>{
        console.log(newUser)
        res.render("profile.hbs", {
            newUser
        })
    })
})

module.exports = router