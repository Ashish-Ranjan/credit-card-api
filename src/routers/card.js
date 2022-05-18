const express = require("express");
const Card = require("../models/card");
const router = new express.Router();
const { validateReqBody } = require("../validation/validateReqBody");


router.get("/getallcards", (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

router.post("/addnewcard", (req, res) => {
  try {
    validateReqBody(req);
    const card = new Card(req.body);
    card
      .save()
      .then(() => {
        res.status(201).send(card);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(400).send({
            _message: "cardnumber already exists",
            error: "Duplicate Error",
          });
        }
        res.status(400).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
