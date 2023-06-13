const { logEvents } = require("./logEvents");

const errorHandler = (error, req, res) => {
  logEvents(
    `${error.name}:\t 
    ${error.message}\t ${req.method}\t ${req.header.origin}\t ${req.url}`,
    "errorLog.log"
  );
  console.log(error.stack);

  const status = res.statusCode ? req.statusCode : 200;

  res.statusCode(status);
  res.json({ message: error.message });
};

module.exports = errorHandler;
