const express = require('express');
// require  food partner auth middleware to protect the route
const foodPartnerAuthMiddleware = require("../middleware/foodPartner.auth.middleware");
const router = express.Router();
const userAuthMiddleware = require("../middleware/auth.middleware");
const foodController = require("../controllers/food.controller");
// Here we use the multer middleware to handle multipart/form-data for food item creation if needed like the file uploads in future
const multer = require("multer");
// For example, if we want to upload images or videos of the food item, we can use multer to handle that
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as Buffer objects
});
const { foodItemBody } = require("../validator/food.validator");
const validateMiddleware = require('../middleware/validate.middleware');

// *POST /api/food/ [protected]  Create a new food item
// In between the route and controller, we will use the food partner auth middleware to protect this route
router.post(
  "/",
  foodPartnerAuthMiddleware.authenticateFoodPartner,
  upload.single("video"),
  foodItemBody,
  validateMiddleware,
  foodController.createFoodItem,
);

router.get(
  "/",
  userAuthMiddleware.authUserMiddleware,
  foodController.getFoodItem,
);

module.exports = router;

