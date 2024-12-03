const mongoose = require("mongoose");

const connectDB = async (mongoURL) => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Database connected port:27017/Picker");
    })
    .catch((err) => {
        console.log("Database error -> ", err);
    });
};

module.exports = connectDB;