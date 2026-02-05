const { body } = require("express-validator");

const foodItemBody = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Food name is required")
    .isLength({ min: 3 })
    .withMessage("Food name must be at least 3 character"),

  body("price")
    .notEmpty()
    .withMessage("Price for food item is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than zero"),

  body("description")
    .optional()
    .isLength({
      max: 500,
    })
    .withMessage("Description should not exceed with the 500 character"),
];

module.exports = {
  foodItemBody,
};