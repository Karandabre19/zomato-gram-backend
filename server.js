const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

const PORT = process.env.PORT || 5021;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
