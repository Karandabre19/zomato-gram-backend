// this env file is for loading environment variables to give access throughout the project
require("dotenv").config();
// this file is for starting the server
const app = require("./src/app");
const connectDB = require("./src/db/db");
const authRoute = require("./src/routes/auth.route");
const foodPartnerAuthRoute = require("./src/routes/foodPartnerAuth.route");

connectDB();

const PORT = process.env.PORT || 5021;

app.use("/api/auth", authRoute);
app.use("/api/auth/food-partner", foodPartnerAuthRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
