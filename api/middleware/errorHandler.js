const { logEvents } = require("./logEvents");

const errorHandler = (error, req) => {
  logEvents(
    `${error.name}:\t 
    ${error.message}\t ${req.method}\t ${req.header.origin}\t ${req.url}`,
    "errorLog.log"
  );
};

module.exports = errorHandler;
