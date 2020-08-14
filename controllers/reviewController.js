const express = require("express")
const router = express.Router()
const Review = require("../models/reviews")
const bodyparser = require("body-parser")

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended: true
})

router.use(urlencoder)

router.post("/new-review", function(req,res){
    var review = {
        postID: req.body.postID,
        reviewerID: req.session.email,
        review: req.body.review
    }

    Review.create(review).then((review)=>{
        console.log(review)
        //insert prompt here
    },(error)=>{
        res.sendFile(error)
    })
})

module.exports = router