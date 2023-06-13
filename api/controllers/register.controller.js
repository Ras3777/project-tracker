const Users = require("../model/user.model");
const bcrypt = require("bcryptjs");

const createNewUser = async (req, res) => {
  const { firstname, lastname, email, department, password, roles } = req.body;

  try {
    if (!firstname || !lastname || !email || !department || !password) {
      return res.sendStatus(400);
    }

    // const duplicateUser = await Users.aggregate([
    //   { $match: { firstName: firstname, lastName: lastname } },
    // ]).exec();
    // .then((data) => data);

    const user = await Users.find();
    const mapUser = user.find(
      (person) => person.firstName === firstname && person.lastName === lastname
    );

    // if (duplicate) {
    //   console.log(duplicate[0].firstName);
    //   res.sendStatus(409).json({ message: "Duplicate Username", duplicate });
    // } else {
    if (mapUser) {
      console.log(mapUser);
      res.sendStatus(409);
    } else {
      const hashedPwd = bcrypt.hashSync(password, 10);
      const createUser = await Users.create({
        firstName: firstname,
        lastName: lastname,
        email,
        password: hashedPwd,
        department: department,
        roles: roles,
      });
      res.json(createUser);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createNewUser };
