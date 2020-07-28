const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

function validation(user, confirmPass){
    if(user.firstName && user.lastName && user.region && user.email && user.password == confirmPass){
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

    if(validation(user, confirmPass)){
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
        res.redirect("signup.hbs")
    }
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