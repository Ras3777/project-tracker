const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includeds(origin)) {
      return callback(null, true);
    } else {
      callback(new Error());
    }
    setSuccessStatus = 200;
  },
};

module.cors = corsOptions;
