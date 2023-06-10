require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const connect = require("./db/dbConnect");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");

const PORT = process.env.PORT || 3500;
const app = express();

connect();

app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));

app.use("/register", require("./routes/register.routes"));

app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not Found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
});

mongoose.connection.on("error", () => {
  console.log(error);
  logEvents(
    `${error.name}:\t ${error.code}\t ${error.syscall}\t ${error.hostname}\n`,
    "mongoDBErrorLog.txt"
  );
});
