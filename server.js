const express = require("express");
const fs = require("fs")
const morgan = require("morgan")
const path = require("path")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
const port = process.env.PORT



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const test = require("./routes/tickets")
app.use("/",test)


app.listen(port, ()=>{
    console.log(`server Running at Port ${port}`)
})

