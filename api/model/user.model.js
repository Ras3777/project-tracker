const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UsersSchema = Schema({
  firstName: {
    type: String,
    trim: true,
    unique: true,
    require: "firstname is required",
  },
  lastName: {
    type: String,
    trim: true,
    require: "firstname is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  password: { require: true, require: "password is required" },
  department: { type: String },
  projects: [{ type: String }],
  completedPrjects: [{ type: String }],
  created: { type: Date, default: Date.now },
});

const Users = model("Users", UsersSchema);
module.exports = Users;
