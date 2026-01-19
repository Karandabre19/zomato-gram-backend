const express = require("express");
const foodPartnerAuthController = require("../controllers/foodPartnerAuth.controller");
const router = express.Router();

router.post("/user/register", foodPartnerAuthController.registerFoodPartner);
router.post("/user/login", foodPartnerAuthController.loginFoodPartner);
router.get("/user/logout", foodPartnerAuthController.logoutFoodPartner);

module.exports = router;