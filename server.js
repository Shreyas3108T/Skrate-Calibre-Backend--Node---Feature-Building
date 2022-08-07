const express = require("express");
require("dotenv").config()


const app = express()

const port = process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("test")
})
app.listen(port, ()=>{
    console.log(`server Running at Port ${port}`)
})