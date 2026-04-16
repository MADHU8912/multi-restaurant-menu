const express = require("express");
const cors = require("cors");
const restaurants = require("./restaurants.json");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});