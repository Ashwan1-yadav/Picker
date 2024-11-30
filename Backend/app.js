const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")

const DBconnnect = require("./Database/DB_connect")

DBconnnect(process.env.MONGO_URL || "mongodb://localhost:27017/Picker")

app.use(cors())

app.get("/",(req,res)=>{
  res.send("Hello From Express")
})

module.exports = app
