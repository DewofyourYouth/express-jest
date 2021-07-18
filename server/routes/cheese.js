const express = require("express");

const router = express.Router();

let cheeseList = [];

router.use(express.json());

router.get("/", (req, res) => {
  res.send(cheeseList);
});

router.post("/add", (req, res) => {
  const newCheese = req.body;
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

router.delete("/remove/:cheeseId/", (req, res) => {
  const { cheeseId } = req.params;
  cheeseList = cheeseList.filter((cheese) => cheese.id !== parseInt(cheeseId));
  res.send({
    message: `Cheese with id of ${cheeseId} deleted!`,
  });
});

module.exports = router;
