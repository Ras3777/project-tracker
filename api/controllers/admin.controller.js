const Users = require("../model/user.model");
const Projects = require("../model/project.model");
const Departments = require("../model/department.model");

const assert = require("assert");

// @Desc get a All of the info available
// @Route /admin/dashbaord
// @Access Admin
const getAllinfo = async (req, res) => {
  try {
    const users = await Users.find().lean().exec();
    const projects = await Projects.find().lean().exec();
    const departmetns = await Departments.find().lean().exec();
    return res.json({ users: users, projects: projects, departmetns: departmetns });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc get a All of Departments
// @Route /admin/departments
// @Access Admin
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Departments.find().lean().exec();
    return res.json({ departments });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc get a All of Departments
// @Route /admin/departments
// @Access Admin
const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find().lean().exec();
    return res.json({ projects });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// @Desc get a All of the employees
// @Route /admin/employees
// @Access Admin
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Users.find().lean().exec();
    res.json({ employees });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// @Desc get a specific department by its id
// @Route /admin/Departments/:id
// @Access Admin
const getSpecificDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Departments.findById(id).lean().exec();
    return res.json({ department });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// @Desc get a specific Project by its id
// @Route /admin/Projects/:id
// @Access Admin
const getSpecificProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id).exec();
    return res.json({ project });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc get a specific Employee by its id
// @Route /admin/Employees/:id
// @Access Admin
const getSpecificEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Users.findById(id).lean().exec();
    return res.json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc create new Department
// @Route /admin/Departments/
// @AccessAdmin
const createNewDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const createNewDepartment = await Departments.create({
      name,
    });
    return res.json({ createNewDepartment });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc create new Project
// @Route /admin/Projects/
// @Access Admin
const createNewProject = async (req, res) => {
  const { title, departmentName } = req.body;

  try {
    const createProject = await Projects.create({
      title,
      departmentName,
    });
    return res.json({ createProject });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc Assign Role to Employee
// @Route /admin/Employees/
// @Access Admin

const assignRole = async (req, res) => {
  const { departmentName, id } = req.params;
  const { role } = req.body;

  const user = await Users.findById(id);
  const employees = await Users.aggregate([{ $match: { department: departmentName } }]);
  const department = await Departments.findOne({ name: departmentName }).exec();

  // check if the user exists
  if (!user) {
    return res.json({ message: "User with provided id doesn't exist" });
  }
  // check if the role already assigned
  else if (user.roles.includes(role)) {
    return res.json({ message: "User Alread Promoted with the Role" });
  }

  try {
    const detail = {
      id: user.id,
      username: `${user.firstName} ${user.lastName}`,
    };

    if (role.includes("departmentAdmin")) {
      await department.departmentAdmin.push(detail);
      user.roles = role;
      const updatedDepartment = await department.save();
      const updatedEmployee = await user.save();
      console.log(updatedDepartment);
      res.send("successfuly assigned to Department and Employee");
    } else if (role.includes("Employee") || department.departmentAdmin === true) {
      // if the role is Employee or the department is not empty it will remove the the users departmentAdmin role from the deparment and assign it Employee
      user.roles = role;
      department.departmentAdmin.splice(0, department.departmentAdmin.length);
      const deparmentUpdate = await department.save();
      const userUpdated = await user.save();
      console.log(userUpdated);
      return res.json("successfuly assigned");
    }
  } catch (error) {
    console.log(error);
  }
};

// @Desc Delete Department using its id
// @Route /Departments/:id
// @Access Admin
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    // check if the department exists
    const department = await Departments.findById(id).lean().exec();
    if (!department) {
      console.log("Department doesn't exist");
    }
    const result = await department.deleteOne();
    return res.json({ message: `Department ${result.name} Deleted Successfully` });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

// @Desc Delete Project using its id
// @Route /Projects/:id
// @Access Admin
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // check if the department exists
    const project = await Projects.findById(id);

    if (!project) {
      res.json({ message: "Project doesn't exist" });
    } else {
      const result = await project.deleteOne();
      return res.json({ message: `Project ${result.title} Deleted Successfully` });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getAllinfo,
  getAllDepartments,
  getAllProjects,
  getAllEmployees,
  getSpecificDepartment,
  getSpecificProject,
  getSpecificEmployee,
  createNewDepartment,
  createNewProject,
  deleteDepartment,
  deleteProject,
  assignRole,
};
