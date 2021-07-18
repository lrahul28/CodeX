const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({  
  username:{
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    unique: false
  },
  contestname: {
    type: String,
    required: true,
    unique: false
  },
  questionno: {
    type: Number,
    required: true,
    unique: false
  },
  question: {
      type: Array,
      required: true,
      unique: false
  },
  points: {
      type: Number,
      required: true,
      unique: false
  }
});

module.exports = Result = mongoose.model("results", ResultSchema);