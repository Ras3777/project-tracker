const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const { checkRole } = require("../roles/roleValidate");

router.get("/", checkRole(["Admin"]), userController.getSpecificUser);

module.exports = router;
