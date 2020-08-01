const express = require("express")
const router = express.Router()

const app =  express()

router.use("/user", require("./userController"))
router.use("/game", require("./gameController"))
router.use("/post", require("./postController"))
router.use("/cart", require("./cartController"))

router.get("/", function(req,res){
    console.log("GET /")
    res.render("signup.hbs")
})

router.get("/logout", function(req,res){
    res.redirect("/")
})

module.exports = router