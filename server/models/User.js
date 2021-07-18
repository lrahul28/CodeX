const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname:{
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },
  userType: {
    type: String,
    default: "student"
  }
});
module.exports = User = mongoose.model("users", UserSchema);