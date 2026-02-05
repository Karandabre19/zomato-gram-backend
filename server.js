// this env file is for loading environment variables to give access throughout the project
require("dotenv").config();
// this file is for starting the server
const app = require("./src/app");
const connectDB = require("./src/db/db");
connectDB();

const PORT = process.env.PORT || 5021;
exports.PORT = PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
