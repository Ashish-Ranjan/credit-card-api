const express = require("express");
const Card = require("../models/card");
const router = new express.Router();
const { validateReqBody } = require("../validation/validateReqBody");


router.get("/getallcards", (req, res) => {
  try {
    Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch((error) => {
      res.status(500).json();
    });
  } catch (error) {
    res.status(500).json({
      _message: "Something went wrong",
      error: "Internal Server Error",
    });
  }

});

router.post("/addnewcard", (req, res) => {
  try {
    validateReqBody(req);
    const card = new Card(req.body);
    card
      .save()
      .then(() => {
        res.status(201).json(card);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(400).json({
            _message: "cardnumber already exists",
            error: "Duplicate Error",
          });
        }
        res.status(400).json(error);
      });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('*', function(req, res){
  res.status(404).json({
    _message: "Page not found",
    error: "Not found",
  }); // <== YOUR JSON DATA HERE
});
module.exports = router;
