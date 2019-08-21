const mongoose = require("mongoose")

var gameSchema = mongoose.Schema({
    title: String,
    platform: String,
    genre: String,
    date: Date,
    rating: String
}) 

var Game = mongoose.model("game", gameSchema)

exports.create = function(user){
    return new Promise(function(resolve, reject){
        console.log(game)
        var g = new Game(game)

        g.save().then((newGame)=>{
            console.log(newGame)
            resolve(newGame)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Game.findOne({_id:id}).then((game)=>{
            resolve(game)
        }, (err)=>{
            reject(err)
        })
    })
}