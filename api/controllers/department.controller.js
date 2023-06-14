const Projects = require("../model/project.model");
const Users = require("../model/user.model");
const Departments = require("../model/department.model");

// @Desc assign Department's Project for That Department Employee
// @Route /:departmentName/Projects/:id
// @Access departmentAdmin
const assignProjectToEmployee = async (req, res) => {
  const { departmentName, id } = req.params;
  const { employeeId } = req.body;
  const departmentAdmin = req.user;

  const project = await Projects.findById(id).exec();
  const employee = await Users.findById(employeeId).exec();
  const departmenteEmployees = await Users.find({ department: departmentName }).exec();

  try {
    const employees = [].concat(...departmenteEmployees.map((obj) => obj));
    let newProj = [].concat(...departmenteEmployees.map((obj) => obj.projects));

    if (employees.id !== employeeId && newProj.id === id) {
      return res.json("Already Assigned for another User");
    } else if (newProj.find((item) => item.id === id)) {
      return res.json("Already Assigned For This User");
    } else if (employee.department !== departmentName) {
      return res.json("Employee is Not From This Department");
    }

    if (departmentAdmin.department !== employee.department) {
      return res.json("Department Admin can only assign Projects for the Department's Employees");
    }
    employee.projects.push({
      id: project.id,
      title: project.title,
      departtmentName: departmentName,
    });
    project.assignedTo = employeeId;
    const updatedEmployee = await employee.save();
    const updatedProject = await project.save();
    console.log(employees);
    console.log("Successfully Assigned");
    res.json(updatedProject);
  } catch (error) {
    console.log(error);
    return res.json(error.stack);
  }
};

// @Desc get Employees of a given Department
// @Route /:departmentName/Employees
// @Access departmentAdmin
const getEmployeesByDepartment = async (req, res) => {
  const { departmentName } = req.params;
  const department = await Departments.find({ name: departmentName });
  const admin = req.user;

  const users = await Users.aggregate([{ $match: { department: departmentName } }]);
  console.log(admin);
  res.json(users);
};

// @Desc get Projects of a given Department
// @Route /:departmentName/Projects
// @Access departmentAdmin
const getProjectsByDepartment = async (req, res) => {
  const { departmentName } = req.params;

  const projects = await Projects.aggregate([{ $match: { departmentName: departmentName } }]);
  console.log(projects);
  res.json(projects);
};

module.exports = { assignProjectToEmployee, getEmployeesByDepartment, getProjectsByDepartment };
