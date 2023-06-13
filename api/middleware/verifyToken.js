const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const bearerHeader = req.headers["authorization"] || req.headers["Authorization"];

  if (!bearerHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const bearerToken = bearerHeader.split(" ")[1];
  req.token = bearerToken;
  // console.log(req.token);
  jwt.verify(req.token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.status(403);
    // invalid token
    req.user = decoded;
    // console.log(decoded);
    res.json({ decoded });

    next();
  });
};

module.exports = verifyJWT;
