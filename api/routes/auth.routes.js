const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth.controller");

router.route("/").post(loginController.handleLogin);
router.route("/logout").post(loginController.handleLogout);

module.exports = router;
