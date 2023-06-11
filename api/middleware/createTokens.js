const jwt = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles,
      department: user.department,
      projects: user.projects,
      completedPrjects: user.completedPrjects,
    },
    process.env.ACCESS_TOKEN
  );

  return accessToken;
};

module.exports = createTokens;
