const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProjectsSchema = Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    require: "title is required",
  },
  departmentName: {
    type: String,
    trim: true,
  },
  assignedTo: { type: String },
  completed: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

const Projects = model("Projects", ProjectsSchema);
module.exports = Projects;
