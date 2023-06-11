const Users = require("../model/user.model");
const jwt = require("jsonwebtoken");

const getSpecificUser = async (req, res) => {
  const { id } = req.user;
  const user = await Users.findById(id).lean().exec();
  // console.log(user);
  res.json({ message: "Hello User", user });
};

module.exports = { getSpecificUser };
