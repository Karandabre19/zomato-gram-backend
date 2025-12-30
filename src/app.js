const express = require('express');

const app = express();


app.get("/", () => {
  console.log("Hello from Express");
});

module.exports = app;