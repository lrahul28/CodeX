const mongoose = require("mongoose");

const TestcaseSchema = new mongoose.Schema({
  contestname: {
    type: String,
    required: true
  },
  questiontitle:{
    type: String,
    required: true
  },
  
});

module.exports = Testcase = mongoose.model("testcase", TestcaseSchema);