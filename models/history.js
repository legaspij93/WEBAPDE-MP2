const mongoose = require("mongoose")

var historySchema = mongoose.Schema({
    user: String,
    postingID: String,
    rentDate: Date,
    duration: Number
})

var History = mongoose.model("history", historySchema)

exports.add = function(history){
    return new Promise(function(resolve, reject){
        var h = new History(history)

        h.save().then((newHistory)=>{
            console.log(newHistory)
            resolve(newHistory)
        }, (err)=>{
            reject(err)
        })
    })
}