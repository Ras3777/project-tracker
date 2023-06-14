const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");
const { checkRole } = require("../middleware/roleValidate");

router
  .route("/:departmentName/Projects/:id")
  .post(checkRole(["departmentAdmin"]), departmentController.assignProjectToEmployee);

router
  .route("/:departmentName/Employees")
  .get(checkRole(["Admin", "departmentAdmin"]), departmentController.getEmployeesByDepartment);

router
  .route("/:departmentName/Projects")
  .get(checkRole(["departmentAdmin"]), departmentController.getProjectsByDepartment);

module.exports = router;
