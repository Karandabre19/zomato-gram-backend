const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async ( req, res) => {

        const { firstName, lastName, email, password } = req.body;

        try {

            const userAlreadyExists = await userModel.findOne({ email });

            if (userAlreadyExists) {
                return res
                  .status(400)
                  .send("User already exists with this email");
            }

            const hashesPassword = await bcrypt.hash(password, 10);

            const user = await userModel.create({
              firstName,
              lastName,
              email,
              password: hashesPassword,
            });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            res.cookie("token", token);

            res.status(201).json({
              message: "User register Successfully",
              user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            });

        } catch (error) {
          console.error("Error registering user:", error);
          res.status(500).send("Error registering user");
        }
    }

const loginUser = async (req, res) => {

  const { email , password } = req.body;

  try {

    const user = await userModel.findOne({ email});

    if(!user){
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Error logging in user");
  }

}

const logoutUser = (req, res) =>{

  res.clearCookie("token");
  res.status(200).send("User logged out successfully");

}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};