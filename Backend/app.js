const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DBconnnect = require("./Database/DB_connect");
const userRouter = require("./routes/userRouter");

DBconnnect(process.env.MONGO_URL || "mongodb://localhost:27017/Picker");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello From Express");
});

module.exports = app;