const mongoose = require("mongoose");
require("dotenv").config;

const connect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));
};

module.exports = connect;
