const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://127.0.0.1:27017/credit-card-db";
const mongoose = require("mongoose");
mongoose.connect(MONGO_DB_URL);
