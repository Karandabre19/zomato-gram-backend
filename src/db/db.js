const mongoose = require("mongoose");

function connectDB() {
    mongoose
      .connect("mongodb://localhost:27017/zomato-gram")
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB", error);
      });
}

module.exports = connectDB;