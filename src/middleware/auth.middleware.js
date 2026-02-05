const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Authentication failed !",
    });
  }

  try {
    console.log("token", token);
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verfied token", verifiedToken);
    const user = await userModel.findById(verifiedToken.id);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "User is not available",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("error", error);
    return res.status(401).json({
      message: "Token isn't available Authentication denied",
    });
  }
}

module.exports = {
  authUserMiddleware,
};
