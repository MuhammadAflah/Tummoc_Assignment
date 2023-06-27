const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  return mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
};

module.exports = connect;
