// This file is for creating the Express application instance
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoute = require("./routes/auth.route");
const foodPartnerAuthRoute = require("./routes/foodPartner.auth.route");
const food = require("./routes/food.route");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", () => {
  console.log("Hello from the backend");
});

app.use("/api/auth", authRoute);
app.use("/api/auth/food-partner", foodPartnerAuthRoute);
app.use("/api/food" ,food)



module.exports = app;

// app.get("/updateUser", async (req, res) => {
//   const user = await userModel.findOneAndUpdate({
//     firstName: "karan",
//   }, { firstName: "Karan keshav" }, { new: true });
//   res.send(user);
//   console.log("User created");
// });

// app.get("/createUser", async (req, res)=>{
//   const user = await userModel.create({
//     firstName: "adhyayan",
//     lastName :"Dahare",
//     email:"AD198@gmail.com",
//     password:"Karan@1234"
//   })
// })

// app.get("/readUser", async (req, res) => {
//   const user = await userModel.find();
//   res.send(user);
// });
// app.get("/deleteUser", async (req, res) => {
//   try {
//     const user = await userModel.findOneAndDelete({ firstName: "Karan keshav" });
//     res.send(user);
//   } catch (error) {
//     res.status(500).send("Error deleting user");
//   }
// });
// When we create some of the models using mongoose, mongoose creates a collection in the database with the plural form of the model name. For example, if we create a model named 'User', mongoose will create a collection named 'users' in the database.
// and when we create a document using that model, it will be stored in the 'users' collection.
// and also it generate the createdAt and updatedAt fields automatically in the document because we have set the timestamps option to true in the schema.
// also the _id field is generated automatically by mongoose for each document. which is of type ObjectId and is unique for each document. and 24 character long hexadecimal string. 


// find will return an array of documents that match the query. if no documents match, it will return an empty array.
// findOne will return the first document that matches the query. if no document matches, it will return null.
// findOneAndUpdate will find the first document that matches the query and update it with the provided update object. it will return the updated document. if no document matches, it will return null.
// findOneAndDelete will find the first document that matches the query and delete it. it will return the deleted document. if no document matches, it will return null.