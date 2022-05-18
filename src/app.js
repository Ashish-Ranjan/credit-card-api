const express = require("express");
require("./db/mongoose");
const cardRouter = require('./routers/card');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cardRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
