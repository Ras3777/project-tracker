const { format } = require("date-fns");
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t ${uuid()}\t ${message}`;

  if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
    await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
  }

  await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem);
};

const logger = (req, res, next) => {
  logEvents(`${req.url}\t ${req.method}\t ${req.headers.origin}\n `, "reqLog.log");
  console.log(`${req.url}\t ${req.method}\t ${req.headers.origin}\n`);
};

module.exports = { logEvents, logger };
