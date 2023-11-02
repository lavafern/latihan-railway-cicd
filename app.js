require("dotenv").config()
const express = require("express")
const app = express()
const {PORT} = process.env

app.get('/',(req,res) => {
    res.json({
        message : "hello world",
        status : "ok"
    })
})

app.listen(PORT,() => console.log("listening to port",PORT))