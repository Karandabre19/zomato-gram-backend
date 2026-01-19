// Here we are setting up the MongoDB connection using Mongoose and creating a function to connect to the database.

const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
}

module.exports = connectDB;
