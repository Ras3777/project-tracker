const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DepartmentsSchema = Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    require: "department name is required",
  },
  departmentAdmin: { type: String },
  numberOfEmployess: { type: Number },
  created: { type: Date, default: Date.now },
});

const Departments = model("Departments", DepartmentsSchema);
module.exports = Departments;
