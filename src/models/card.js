const mongoose = require("mongoose");
const { luhnValidation } = require("../validation/luhnValidation");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cardnumber: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!luhnValidation(value) || value.length > 19) {
        throw new Error("Invalid Card Number");
      }
    },
  },
  limit: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
