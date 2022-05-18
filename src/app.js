const express = require("express");
require("./db/mongoose");
const cardRouter = require("./routers/card");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(cardRouter);

module.exports = app;
