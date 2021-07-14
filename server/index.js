const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "App is running!" });
});

app.get("/add/:a/:b", (req, res) => {
  const { a, b } = req.params;
  res.send({ message: parseInt(a) + parseInt(b) });
});

module.exports = app;
