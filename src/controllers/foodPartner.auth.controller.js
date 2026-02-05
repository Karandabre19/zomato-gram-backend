const foodPartnerSchema = require("../models/foodPartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerFoodPartner = async ( req, res) => {
        const { name, email, address, phone, password } = req.body;

        try {

            const partnerAlreadyExists = await foodPartnerSchema.findOne({
              email,
            });

            if (partnerAlreadyExists) {
              return res
                .status(400)
                .send("Food Partner already exists with this email");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const foodPartner = await foodPartnerSchema.create({
              name,
              email,
              address,
              phone,
              password: hashedPassword,
            });

            const token = jwt.sign(
              { id: foodPartner._id },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            res.cookie("token", token);

            res.status(201).json({
              message: "Food Partner registered Successfully",
              foodPartner: {
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
                address: foodPartner.address,
                phone: foodPartner.phone,
              },
            });

        } catch (error) {
            console.error("Error registering food partner:", error);
            res.status(500).send("Error registering food partner");
        }
}


const loginFoodPartner = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foodPartner = await foodPartnerSchema.findOne({ email });

    if (!foodPartner) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner.password
    );

    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token);
    res.status(200).json({
      message: "Food Partner logged in Successfully",
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
        address: foodPartner.address,
        phone: foodPartner.phone,
      },
    });
  } catch (error) {
    console.error("Error logging in food partner:", error);
    res.status(500).send("Error logging in food partner");
  }
}

const logoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Food Partner logged out successfully" });
};

module.exports = {
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};