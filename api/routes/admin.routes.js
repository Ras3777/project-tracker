const express = require("express");
const router = express.Router();
const { checkRole } = require("../middleware/roleValidate");
const adminController = require("../controllers/admin.controller");

router.route("/dashboard").get(checkRole(["Admin"]), adminController.getAllinfo);

router.route("/Departments").get(checkRole(["Admin"]), adminController.getAllDepartments);
router.route("/Projects").get(checkRole(["Admin"]), adminController.getAllProjects);
router.route("/Employees").get(checkRole(["Admin"]), adminController.getAllEmployees);

router
  .route("/Departmets/:id")
  .get(checkRole(["Admin"]), adminController.getSpecificDepartment)
  .delete(checkRole(["Admin"]), adminController.deleteDepartment);
router
  .route("/Projects/:id")
  .get(checkRole(["Admin"]), adminController.getSpecificProject)
  .delete(checkRole(["Admin"]), adminController.deleteProject);
router
  .route("/Employees/:id")
  .get(checkRole(["Admin"]), adminController.getSpecificEmployee)
  .post(checkRole(["Admin"]), adminController.assignRole);

router.route("/Departments/").post(checkRole(["Admin"]), adminController.createNewDepartment);
router.route("/Projects/").post(checkRole(["Admin"]), adminController.createNewProject);

module.exports = router;
