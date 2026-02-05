const foodPartnerModel = require("../models/foodPartner.model");
const jwt = require("jsonwebtoken");

const authenticateFoodPartner = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "No authentication token, access denied" });
  }

  try {
    console.log("Token:", token);
    // Here the JWT verify function checks if the token is valid and not tampered with or expired.
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Verified Token:", verifiedToken);
    const foodPartner = await foodPartnerModel.findById(verifiedToken.id);
    if (!foodPartner) {
      return res
        .status(401)
        .json({ message: "Food Partner not found, authorization denied" });
    }
    req.foodPartner = foodPartner;
    // Here the next() function is called to pass control to the next controller function in the stack.
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token verification failed, authorization denied",
    });
  }
};

module.exports = {
  authenticateFoodPartner
};