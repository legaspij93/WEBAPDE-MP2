const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Post = require("../models/post")
const Game = require("../models/game")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function regValidation(user, confirmPass){
    if(user.firstName && user.lastName && user.region && user.email && user.password == confirmPass){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            if(!/[^a-zA-Z0-9]/.test(user.firstName) && !/[^a-zA-Z0-9]/.test(user.lastName)){
                return true
            }
            else{
                return false
            }
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

function validation(user){
    if(user.email && user.password){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)){
            return true
        }
        else{
            return false
        }
    }
    else{
        return false
    }
}

router.post("/register", function(req, res){
    var user = {
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        region: req.body.region,
        email: req.body.email,
        password : req.body.password
    }
    var confirmPass = req.body.confirmPass

    if(regValidation(user, confirmPass)){
        User.create(user).then((user)=>{
            console.log(user)
            req.session.username = user.username
            res.render("loginscreen.hbs")
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        //insert error message here
        res.redirect("/")
    }
})

router.post("/login", function(req, res){
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    if(validation(user)){
        User.authenticate(user).then((newUser)=>{
            if(newUser){
                req.session.email = user.email
                console.log(req.session.email)
                res.redirect("/game/games")
                // res.render("dashboard.hbs")
            }
        }, (error)=>{
            res.sendFile(error)
        })
    }
    else{
        //insert error message here
        res.redirect("/user/loginpage")
    }
})

router.get("/loginpage", function(req,res){
    res.render("loginscreen.hbs")
})

router.get("/profile", function(req,res){
    currUser = req.session.email
    User.getUser(currUser).then((newUser)=>{
//        console.log(newUser)
        Post.getAll().then((posts)=>{
            Game.getAll().then((games)=>{
                res.render("profile.hbs", {
                    newUser, posts, games
                })
            })
        })
        
    })
})

module.exports = router