const express = require("express");

const router = express.Router();

let cheeseList = [];

router.use(express.json());

router.get("/", (req, res) => {
  res.send(cheeseList);
});

router.post("/add", (req, res) => {
  let newCheese = req.body;
  if (cheeseList.map((cheese) => cheese.id).includes(newCheese.id)) {
    res.status(409);
    res.send({
      message: `a cheese with an id of ${newCheese.id} already exists`,
    });
  } else if (newCheese.id && newCheese.name && newCheese.pricePerKilo) {
    res.status(201);
    cheeseList.push(newCheese);
    res.send({
      message: `${newCheese.name} was added to the list of cheeses!`,
    });
  } else {
    res.status(400);
    res.send({ message: "Invalid input" });
  }
});

module.exports = router;
