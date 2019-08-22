const mongoose = require("mongoose")

var postSchema = mongoose.Schema({
    title: String,
    user: String,
    cost: Number,
    status: String,
    region: String,
    rentStart: Date,
    rentEnd: Date
}) 

var Post = mongoose.model("post", postSchema)

exports.create = function(user){
    return new Promise(function(resolve, reject){
        console.log(post)
        var p = new Post(post)

        p.save().then((newPost)=>{
            console.log(newPost)
            resolve(newPost)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Post.findOne({_id:id}).then((post)=>{
            resolve(post)
        }, (err)=>{
            reject(err)
        })
    })
}