const express = require("express");
const cheeses = require("./routes/cheese");

const app = express();
app.use(express.json());
app.use("/cheeses", cheeses);

app.get("/", (req, res) => {
  res.send({ message: "App is running!" });
});

app.get("/add/:a/:b", (req, res) => {
  const { a, b } = req.params;
  res.send({ message: parseInt(a) + parseInt(b) });
});

module.exports = app;
