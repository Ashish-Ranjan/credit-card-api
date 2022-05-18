const express = require("express");
require("./db/mongoose");
const cardRouter = require('./routers/card');

const app = express();

app.use(express.json());
app.use(cardRouter);

module.exports = app;