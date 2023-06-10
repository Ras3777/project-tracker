require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const connect = require("./db/dbConnect");

const PORT = process.env.PORT || 3500;
const app = express();

connect();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
});

mongoose.connection.on("error", () => {});
