const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");

router.post("/", registerController.createNewUser);

module.exports = router;
