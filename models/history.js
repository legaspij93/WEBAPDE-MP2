const mongoose = require("mongoose")

var historySchema = mongoose.Schema({
    user: String,
    postingID: String,
    rentDate: Date,
    duration: Number,
    returned: Boolean
})

var History = mongoose.model("history", historySchema)

exports.getAll = function(){
    return new Promise(function(resolve, reject){
        History.find().then((history)=>{
            resolve(history)
        }, (err)=>{
            reject(err)
        })
    })
}

