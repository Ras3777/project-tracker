const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../model/user.model");
const createTokens = require("../middleware/createTokens");

// @desc Login
// @Route POST /auth/
// @Access Public
const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });
  const userPwd = user.password;
  bcrypt.compare(password, userPwd).then((match) => {
    if (!match) {
      res.status(400).json({ error: "Wrong username or password" });
    } else {
      const accessToken = createTokens(user);
      res.cookie("jwt", accessToken, {
        maxAge: 60 * 60 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json("LOGGED IN");
    }
  });
};

// @desc Logout
// @Route POST /auth/logout
// @Access Public
const handleLogout = async (req, res) => {
  const cookies = req?.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); // no content
  }
  res
    .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    .json({ message: "LOGGED OUT" });
};

module.exports = { handleLogin, handleLogout };
