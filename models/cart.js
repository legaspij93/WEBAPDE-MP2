const mongoose = require("mongoose")

var cartSchema = mongoose.Schema({
    title: String,
    price: Number, //change to duration
    link: String,
    user: String,
    release: Date,
    duration: Number
})

var Cart = mongoose.model("cart", cartSchema)

exports.add = function(cart){
    return new Promise(function(resolve, reject){
        var c = new Cart(cart)

        c.save().then((newCart)=>{
            console.log(newCart)
            resolve(newCart)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.get = function(id){
    return new Promise(function(resolve, reject){
        Cart.findOne({_id:id}).then((cart)=>{
            resolve(cart)
        }, (err)=>{
            reject(err)
        })
    })
}

exports.getAll = function(){
    return new Promise(function(resolve, reject){
      Cart.find().then((cart)=>{
        resolve(cart)
      }, (err)=>{
        reject(err)
      })
    })
  }