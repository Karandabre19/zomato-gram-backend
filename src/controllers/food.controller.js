const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid");
// *POST /api/food/ [protected]  Create a new food item
const createFoodItem = async (req, res) => {

  const { name, price, description } = req.body;
  const foodDoc = req.file;
  const uploadedFoodDoc = await uploadFile(foodDoc.buffer, uuid());

  const foodItem = await foodModel.create({
    name: name,
    description: description,
    price: price,
    video: uploadedFoodDoc.url,
    foodPartner: req.foodPartner._id,
  });
  res.status(201).json({
    message: "Food Item created successfully",
    foodItem,
  });
 };

const getFoodItem = async (req, res) => {

  const foodItem = await foodModel.find();

  res.status(200).json({
    message: "Food item fetched successfully",
    foodItem,
  });

};

module.exports = {
  createFoodItem,
  getFoodItem,
};