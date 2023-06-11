const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.roles) ? res.json("Unauthorized") : next();
};

module.exports = { checkRole };
