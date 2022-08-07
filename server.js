const express = require("express");
const fs = require("fs")
const morgan = require("morgan")
const path = require("path")
require("dotenv").config()
const {routes} = require("./routes/tickets")
const app = express()

const port = process.env.PORT || 3000

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use("/",routes)

app.listen(port, ()=>{
    console.log(`server Running at Port ${port}`)
})