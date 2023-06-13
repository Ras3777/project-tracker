const mongoose = require("mongoose");
const logEvents = require("../middleware/logEvents");
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
    require: "lastname is required",
  },
  email: {
    type: String,
    trim: true,
    // unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  roles: { type: String, default: "Employee" },
  password: { type: String, require: "Password Required" },
  department: { type: String, trim: true },
  projects: [],
  completedPrjects: [{ type: String }],
  created: { type: Date, default: Date.now },
});

// UsersSchema.pre("save", function (error, next) {
//   logEvents(`${error.name}:\t ${error.code} ${error.message}`, "mongoError.txt");

//   if (error.name === "MongoServerErrror" && error.code === 1100) {
//     next(new Error("There was a duplicate key error"));
//   } else {
//     return next();
//   }

//   console.log(`${error.name}:\t ${error.code} ${error.message}`);
// });

const Users = model("Users", UsersSchema);
module.exports = Users;
